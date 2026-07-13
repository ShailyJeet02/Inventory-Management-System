const Product = require("../models/Product");
const Order = require("../models/Order");
const Activity = require("../models/Activity");
const User = require("../models/User");

// =========================
// Dashboard Stats
// =========================
const getStats = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;

    const [
      totalProducts,
      totalOrders,
      lowStockItems,
      revenueResult,
      totalUsers,
    ] = await Promise.all([
      Product.countDocuments({
        userId,
      }),

      Order.countDocuments({
        createdBy: userId,
      }),

      Product.countDocuments({
        userId,
        quantity: { $lte: 5 },
      }),

      Order.aggregate([
        {
          $match: {
            createdBy: userId,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]),

      User.countDocuments(),
    ]);

    const revenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      totalProducts,
      totalOrders,
      lowStockItems,
      revenue,
      totalUsers,

      // Future Dashboard Growth
      productGrowth: 0,
      stockChange: 0,
      orderGrowth: 0,
      revenueGrowth: 0,
    });
  } catch (error) {
    console.log("Dashboard Stats Error :", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Revenue Chart
// =========================
const getRevenueChart = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;

    const revenueData = await Order.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
      {
        $group: {
          _id: "$date",
          value: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const chartData = revenueData.map((item) => ({
      day: item._id,
      value: item.value,
    }));

    res.status(200).json(chartData);
  } catch (error) {
    console.log("Revenue Chart Error :", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Recent Activity
// =========================
const getActivity = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;

    const activities = await Activity.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.status(200).json(activities);
  } catch (error) {
    console.log("Dashboard Activity Error :", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
  getRevenueChart,
  getActivity,
};