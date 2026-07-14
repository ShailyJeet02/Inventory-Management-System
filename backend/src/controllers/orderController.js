const Order = require("../models/Order");
const Activity = require("../models/Activity");

// ==============================
// CREATE ORDER
// ==============================
exports.createOrder = async (req, res) => {
  try {
    const {
      orderType,
      customer,
      date,
      amount,
      status,
    } = req.body;

    const order = await Order.create({
      orderType,
      customer,
      date,
      amount: Number(amount),
      status: status || "Pending",
      createdBy: req.user._id || req.user.id,
    });

    await Activity.create({
      userId: req.user._id || req.user.id,
      type: "order",
      title: "New Order Created",
      desc: `${customer} placed an order worth ₹${amount}`,
      color: "green",
      time: "Just now",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET ALL ORDERS
// ==============================
exports.getOrders = async (req, res) => {
  try {
    const {
      status,
      startDate,
      endDate,
      orderType,
      search,
    } = req.query;

    let filter = {
      createdBy: req.user._id || req.user.id,
    };

    if (status) {
      filter.status = status;
    }

    if (orderType) {
      filter.orderType = orderType;
    }

    if (search) {
      filter.customer = {
        $regex: search,
        $options: "i",
      };
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const orders = await Order.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET SINGLE ORDER
// ==============================
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      createdBy: req.user._id || req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log("Get Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// UPDATE ORDER
// ==============================
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id || req.user.id,
      },
      {
        orderType: req.body.orderType,
        customer: req.body.customer,
        date: req.body.date,
        amount: Number(req.body.amount),
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Activity.create({
      userId: req.user._id || req.user.id,
      type: "order",
      title: "Order Updated",
      desc: `${order.customer}'s order updated (${order.status})`,
      color: "blue",
      time: "Just now",
    });

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.log("Update Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// DELETE ORDER
// ==============================
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id || req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Activity.create({
      userId: req.user._id || req.user.id,
      type: "order",
      title: "Order Deleted",
      desc: `${order.customer}'s order deleted`,
      color: "red",
      time: "Just now",
    });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("Delete Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};