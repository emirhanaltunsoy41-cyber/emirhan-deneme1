const express = require("express");
const axios = require("axios");

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

module.exports = router;
