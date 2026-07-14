const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");


// ====================================
// CREATE ORDER
// ====================================
router.post(
  "/",
  authMiddleware,
  createOrder
);


// ====================================
// GET ALL ORDERS
// ====================================
router.get(
  "/",
  authMiddleware,
  getOrders
);


// ====================================
// GET SINGLE ORDER
// ====================================
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);


// ====================================
// UPDATE ORDER
// ====================================
router.put(
  "/:id",
  authMiddleware,
  updateOrder
);


// ====================================
// DELETE ORDER
// ====================================
router.delete(
  "/:id",
  authMiddleware,
  deleteOrder
);


module.exports = router;