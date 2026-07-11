const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

// Add Product
router.post("/", authMiddleware, addProduct);

// Get All Products
router.get("/", authMiddleware, getProducts);

// Get Single Product
router.get("/:id", authMiddleware, getProductById);

// Update Product
router.put("/:id", authMiddleware, updateProduct);

// Delete Product
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;