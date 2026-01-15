const express = require("express");
const axios = require("axios");

const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, phone, address, lat, lng, service_id FROM students ORDER BY id"
    );
    return res.json({ data: result.rows });
  } catch (error) {
    console.error("Failed to fetch students", error);
    return res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  const { name, phone, address, service_id } = req.body;

  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof address !== "string" ||
    typeof service_id !== "number"
  ) {
    return res.status(400).json({
      error: "name, phone, address, service_id are required"
    });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GOOGLE_API_KEY is not configured" });
  }

  try {
    const geoResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: apiKey
        }
      }
    );

    if (
      geoResponse.data.status !== "OK" ||
      !geoResponse.data.results ||
      geoResponse.data.results.length === 0
    ) {
      return res.status(400).json({ error: "Address not found" });
    }

    const { lat, lng } = geoResponse.data.results[0].geometry.location;

    const result = await pool.query(
      "INSERT INTO students (name, phone, address, lat, lng, service_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, phone, address, lat, lng, service_id]
    );

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Failed to create student", error);
    return res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
