const Product = require("../models/Product");
const Order = require("../models/Order");
const Supplier = require("../models/Supplier");
const User = require("../models/User");
const Activity = require("../models/Activity");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Run queries in parallel
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      sales,
      orders,
      completed,
      pending,
      cancelled,
      activityDocs,
    ] = await Promise.all([
      Product.countDocuments({
        userId: userId.toString(),
      }),

      Order.countDocuments({
        createdBy: userId,
      }),

      User.countDocuments(),

      Order.aggregate([
        {
          $match: {
            createdBy: userId,
            orderType: "sales",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),

      Order.find({
        createdBy: userId,
        orderType: "sales",
      }),

      Order.countDocuments({
        createdBy: userId,
        status: "Completed",
      }),

      Order.countDocuments({
        createdBy: userId,
        status: "Pending",
      }),

      Order.countDocuments({
        createdBy: userId,
        status: "Cancelled",
      }),

      Activity.find({
        userId: userId.toString(),
      })
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const totalSales = sales.length ? sales[0].total : 0;

    // Revenue Chart
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueMap = {};

    months.forEach((m) => (revenueMap[m] = 0));

    orders.forEach((order) => {
      const month = new Date(order.date).toLocaleString("en-US", {
        month: "short",
      });

      revenueMap[month] += Number(order.amount || 0);
    });

    const revenueData = months.map((m) => ({
      month: m,
      revenue: revenueMap[m],
    }));

    const orderStatus = [
      {
        name: "Completed",
        value: completed,
      },
      {
        name: "Pending",
        value: pending,
      },
      {
        name: "Cancelled",
        value: cancelled,
      },
    ];

    const total = completed + pending + cancelled || 1;

    const orderSummary = [
      {
        title: "Completed Orders",
        value: Math.round((completed * 100) / total),
        color: "bg-emerald-500",
      },
      {
        title: "Pending Orders",
        value: Math.round((pending * 100) / total),
        color: "bg-amber-500",
      },
      {
        title: "Cancelled Orders",
        value: Math.round((cancelled * 100) / total),
        color: "bg-red-500",
      },
    ];

    const activities = activityDocs.map((item) => ({
      title: item.title,
      description: item.desc,
      time: item.time,
      color: item.color,
    }));

    res.status(200).json({
      stats: [
  {
    title: "Total Sales",
    value: totalSales,
    change: "+0%",
    icon: "FiDollarSign",
  },
  {
    title: "Total Orders",
    value: totalOrders,
    change: "+0%",
    icon: "FiShoppingCart",
  },
  {
    title: "Products",
    value: totalProducts,
    change: "+0%",
    icon: "FiPackage",
  },
  {
    title: "Users",
    value: totalUsers,
    change: "+0%",
    icon: "FiUsers",
  },
],

      revenueData,
      orderStatus,
      orderSummary,
      activities,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};