const express = require("express");

const servicesRoutes = require("./services");
const studentsRoutes = require("./students");

const router = express.Router();

router.use("/services", servicesRoutes);
router.use("/students", studentsRoutes);

module.exports = router;
