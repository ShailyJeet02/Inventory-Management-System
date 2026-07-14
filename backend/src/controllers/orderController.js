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
      amount,
      status,
      createdBy: req.user._id,
    });

    await Activity.create({
      userId: req.user.id,
      type: "order",
      title: "New Order Created",
      desc: `${customer} placed an order worth ₹${amount}`,
      color: "green",
      time: "Just now"
    });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// GET ORDERS
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
      createdBy: req.user._id,
    };

    if (status)
      filter.status = status;

    if (orderType)
      filter.orderType = orderType;

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

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
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
      createdBy: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
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
        createdBy: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await Activity.create({
      userId: req.user.id,
      type: "order",
      title: "Order Updated",
      desc: `Order of ${order.customer} status updated`,
      color: "blue",
      time: "Just now"
    });

    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
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
      createdBy: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await Activity.create({
      userId: req.user.id,
      type: "order",
      title: "Order Deleted",
      desc: `Order of ${order.customer} removed`,
      color: "orange",
      time: "Just now"
    });

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};