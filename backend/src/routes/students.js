const express = require("express");

const router = express.Router();

const students = [
  { id: 1, name: "Ada Lovelace", department: "Computer Science" },
  { id: 2, name: "Alan Turing", department: "Mathematics" },
  { id: 3, name: "Grace Hopper", department: "Engineering" }
];

router.get("/", (req, res) => {
  res.json({ data: students });
});

router.post("/", (req, res) => {
  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({ error: "name and department are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    department
  };

  students.push(newStudent);
  res.status(201).json({ data: newStudent });
});

module.exports = router;
