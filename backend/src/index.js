const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const servicesRoutes = require("./routes/services");
const studentsRoutes = require("./routes/students");
const routesRoutes = require("./routes/routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/services", servicesRoutes);
app.use("/students", studentsRoutes);
app.use("/routes", routesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
