const express = require("express");
const axios = require("axios");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    res.json({
      count: response.data.length,
      data: response.data.slice(0, 5),
    });
  } catch (error) {
    res.status(502).json({ error: "Upstream service error" });
  }
});

router.post("/", async (req, res) => {
  const { plate, start_lat, start_lng } = req.body;

  if (
    typeof plate !== "string" ||
    typeof start_lat !== "number" ||
    typeof start_lng !== "number"
  ) {
    return res.status(400).json({
      error: "plate, start_lat, start_lng are required"
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO services (plate, start_lat, start_lng) VALUES ($1, $2, $3) RETURNING *",
      [plate, start_lat, start_lng]
    );

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Failed to insert service", error);
    return res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
