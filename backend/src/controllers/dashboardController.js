// =========================
// Revenue Chart
// =========================

const getRevenueChart = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;

    const orders = await Order.find({
      createdBy: userId,
    }).sort({
      createdAt: 1,
    });

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

    const monthlyRevenue = {};

    months.forEach((month) => {
      monthlyRevenue[month] = 0;
    });

    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      monthlyRevenue[month] += Number(order.amount || 0);
    });

    const chartData = months.map((month) => ({
      month,
      revenue: monthlyRevenue[month],
    }));

    res.status(200).json(chartData);
  } catch (error) {
    console.log("Revenue Chart Error :", error);

    res.status(500).json({
      message: error.message,
    });
  }
};