const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// ===============================
// Import Routes
// ===============================

const authRoutes = require("./routers/auth");
const productRoutes = require("./routers/products");
const orderRoutes = require("./routers/orders");
const supplierRoutes = require("./routers/suppliers");
const userRoutes = require("./routers/users");
const settingsRoutes = require("./routers/settings");
const reportRoutes = require("./routers/reports");
const helpRoutes = require("./routers/help");
const dashboardRoutes = require("./routers/dashboard");

const app = express();

// ===============================
// Database Connection
// ===============================

connectDB();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "http://localhost:5002",
    credentials: true
  })
);

app.use(express.json());

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Inventory Backend Running"
  });
});

// ===============================
// Reports Test Route
// (Delete Later)
// ===============================

app.get("/api/reports-test", (req, res) => {
  res.status(200).json({
    message: "Reports Route Working"
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/suppliers", supplierRoutes);

app.use("/api/users", userRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/help", helpRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    message: "API Route Not Found",
    route: req.originalUrl
  });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});