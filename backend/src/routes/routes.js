const express = require("express");

const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const { service_id } = req.query;

  try {
    let query =
      "SELECT id, service_id, route_data, created_at FROM routes";
    const params = [];

    if (service_id) {
      query += " WHERE service_id = $1";
      params.push(service_id);
    }

    query += " ORDER BY created_at DESC LIMIT 1";

    const result = await pool.query(query, params);
    const route = result.rows[0] || null;

    return res.json({ data: route });
  } catch (error) {
    console.error("Failed to fetch routes", error);
    return res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  const { service_id, route_data } = req.body;

  if (typeof service_id !== "number" || !route_data) {
    return res
      .status(400)
      .json({ error: "service_id and route_data are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO routes (service_id, route_data) VALUES ($1, $2) RETURNING *",
      [service_id, JSON.stringify(route_data)]
    );

    return res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Failed to create route", error);
    return res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
