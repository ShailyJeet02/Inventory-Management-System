const Product = require("../models/Product");
const Order = require("../models/Order");
const Activity = require("../models/Activity");



// =========================
// Dashboard Stats
// =========================

const getStats = async (req, res) => {

    try {


        // Total Products

        const totalProducts = await Product.countDocuments();



        // Total Orders

        const totalOrders = await Order.countDocuments();



        // Low Stock Products

        const lowStockItems = await Product.countDocuments({

            quantity: {
                $lte: 5
            }

        });



        // Total Revenue

        const revenueResult = await Order.aggregate([


            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$amount"

                    }

                }

            }


        ]);



        const revenue =
            revenueResult[0]?.totalRevenue || 0;



        res.status(200).json({

            totalProducts,

            lowStockItems,

            totalOrders,

            revenue,


            // Future use

            productGrowth: 0,

            stockChange: 0,

            orderGrowth: 0,

            revenueGrowth: 0


        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};









// =========================
// Revenue Chart
// =========================

const getRevenueChart = async (req, res) => {

    try {


        const revenueData = await Order.aggregate([


            {

                $group: {

                    _id: "$date",

                    value: {

                        $sum: "$amount"

                    }

                }

            },


            {

                $sort: {

                    _id: 1

                }

            }


        ]);




        const chartData = revenueData.map(item => ({


            day: item._id,


            value: item.value



        }));




        res.status(200).json(chartData);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};









// =========================
// Recent Activity
// =========================

const getActivity = async (req, res) => {

    try {



        const activities = await Activity.find()

            .sort({

                createdAt: -1

            })

            .limit(5);




        res.status(200).json(activities);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};







module.exports = {


    getStats,

    getRevenueChart,

    getActivity


};