const Order = require("../models/Order");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");



// GET REPORTS

const getReports = async (req, res) => {

    try {

        const { userId } = req.query;


        if (!userId) {

            return res.status(400).json({

                message: "User ID is required"

            });

        }



        // Get User Orders

        const orders = await Order.find({

            createdBy: userId

        });



        // Calculate Real Data

        const totalSales = orders.reduce(

            (sum, order) => sum + order.amount,

            0

        );



        const totalOrders = orders.length;



        const avgOrderValue = totalOrders > 0

            ? totalSales / totalOrders

            : 0;





        // Products Count

        const totalProducts = await Product.countDocuments({

            userId: userId

        });





        // Supplier Count

        const totalSuppliers = await Supplier.countDocuments({

            createdBy: userId

        });






        /*
            Chart Data

            Jan-May:
            Historical Dummy Data

            Jun:
            Real Database Data

            Jul:
            Future Month
        */



        const chart = [

            {
                month:"Jan",
                sales:18000,
                orders:12
            },

            {
                month:"Feb",
                sales:26000,
                orders:18
            },

            {
                month:"Mar",
                sales:34000,
                orders:22
            },

            {
                month:"Apr",
                sales:42000,
                orders:28
            },

            {
                month:"May",
                sales:56000,
                orders:35
            },

            {
                month:"Jun",
                sales:totalSales,
                orders:totalOrders
            },

            {
                month:"Jul",
                sales:0,
                orders:0
            }

        ];






        res.status(200).json({

            cards:{

                totalSales,

                totalOrders,

                avgOrderValue

            },


            chart,


            totalProducts,


            totalSuppliers


        });



    }

    catch(error){


        console.log(
            "Report Error:",
            error
        );


        res.status(500).json({

            message:"Server Error",

            error:error.message

        });


    }

};



module.exports = {

    getReports

};