const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routers/auth");
const productRoutes = require("./routers/products");
const orderRoutes = require("./routers/orders");
const supplierRoutes = require("./routers/suppliers");
const userRoutes = require("./routers/users");
const settingsRoutes = require("./routers/settings");
const reportRoutes = require("./routers/reports"); // ✅ Correct: routers/reports.js

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5002",
    credentials: true
  })
);

app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Inventory Backend Running"
  });
});

// Temporary test route - delete later
app.get("/api/reports-test", (req, res) => {
  res.status(200).json({
    message: "reports route working"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/reports", reportRoutes); // ✅ Correct

// 404 Handler - ye sabse last me hona chahiye
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
    route: req.originalUrl
  });
});

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
