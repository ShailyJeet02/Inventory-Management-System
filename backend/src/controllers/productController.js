const Product = require("../models/Product");
const Activity = require("../models/Activity");

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      quantity,
      price,
      supplier,
    } = req.body;

    // userId ko String me convert karo - IMPORTANT
    const userId = String(req.user._id || req.user.id || req.user.userId);

    console.log("REQ.BODY:", req.body);
    console.log("REQ.USER:", req.user);
    console.log("USER ID:", userId);
    console.log("SUPPLIER:", supplier);

    if (!userId || userId === 'undefined') {
      return res.status(400).json({
        message: "User ID not found in token",
      });
    }

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category are required",
      });
    }

    const newProduct = await Product.create({
      name,
      category,
      description: description || "",
      quantity: Number(quantity) || 0,
      price: Number(price) || 0,
      supplier: supplier || "",
      userId,
    });

    // ==========================
    // Dashboard Activity
    // ==========================
    try {
      await Activity.create({
        userId,
        type: "inventory",
        title: "New Product Added",
        desc: `${name} added to inventory`,
        color: "purple",
        time: "Just now",
      });
    } catch (activityError) {
      console.log("Activity Error:", activityError.message);
    }

    console.log("SAVED PRODUCT:", newProduct);

    res.status(201).json({
      product: newProduct,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// ========================================
// Get All Products
// ========================================

const getProducts = async (req, res) => {
  try {
    const userId = String(req.user._id || req.user.id || req.user.userId);

    console.log("GET PRODUCTS USER ID:", userId);

    if (!userId || userId === 'undefined') {
      return res.status(401).json({
        message: "Unauthorized - User ID not found",
      });
    }

    const products = await Product.find({
      userId,
    }).sort({ createdAt: -1 }); // Latest first

    console.log("FOUND PRODUCTS:", products.length);

    res.status(200).json(products);
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ========================================
// Get Single Product
// ========================================

const getProductById = async (req, res) => {
  try {
    const userId = String(req.user._id || req.user.id || req.user.userId);

    const product = await Product.findOne({
      _id: req.params.id,
      userId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// ========================================
// Update Product
// ========================================

const updateProduct = async (req, res) => {
  try {
    const userId = String(req.user._id || req.user.id || req.user.userId);

    const {
      name,
      category,
      description,
      quantity,
      price,
      supplier,
    } = req.body;

    const updated = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        userId,
      },
      {
        name,
        category,
        description: description || "",
        quantity: Number(quantity),
        price: Number(price),
        supplier: supplier || "",
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Dashboard Activity
    try {
      await Activity.create({
        userId,
        type: "inventory",
        title: "Product Updated",
        desc: `${updated.name} updated successfully`,
        color: "blue",
        time: "Just now",
      });
    } catch (activityError) {
      console.log("Activity Error:", activityError.message);
    }

    res.status(200).json({
      product: updated,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ========================================
// Delete Product
// ========================================

const deleteProduct = async (req, res) => {
  try {
    const userId = String(req.user._id || req.user.id || req.user.userId);

    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Dashboard Activity
    try {
      await Activity.create({
        userId,
        type: "inventory",
        title: "Product Deleted",
        desc: `${deleted.name} removed from inventory`,
        color: "red",
        time: "Just now",
      });
    } catch (activityError) {
      console.log("Activity Error:", activityError.message);
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ========================================
// Exports
// ========================================

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};