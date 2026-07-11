const Order = require("../models/Order");
const Activity = require("../models/Activity");



// =========================
// CREATE ORDER
// =========================
exports.createOrder = async (req, res) => {

    try {

        const {
            orderType,
            customer,
            date,
            amount,
            status
        } = req.body;



        const order = await Order.create({

            orderType,

            customer,

            date,

            amount,

            status,


            // logged in user
            createdBy: req.user.id

        });



        // Create Dashboard Activity

        await Activity.create({

            type: "order",

            title: "New Order Created",

            desc: `${customer} placed an order worth ₹${amount}`,

            color: "green",

            time: "Just now"

        });



        console.log("ORDER SAVED:", order);



        res.status(201).json({

            message: "Order created successfully",

            order

        });



    } catch (error) {


        console.log("Create Order Error:", error);


        res.status(500).json({

            message: error.message

        });


    }

};








// =========================
// GET ALL ORDERS
// =========================
exports.getOrders = async (req, res) => {

    try {


        const orders = await Order.find()

            .sort({

                createdAt: -1

            });



        console.log("ORDERS FETCHED:", orders.length);



        res.json(orders);



    } catch (error) {


        console.log("Get Orders Error:", error);



        res.status(500).json({

            message: error.message

        });


    }

};








// =========================
// GET SINGLE ORDER
// =========================
exports.getOrderById = async (req, res) => {

    try {


        const order = await Order.findById(req.params.id);



        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }



        res.json(order);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};








// =========================
// UPDATE ORDER
// =========================
exports.updateOrder = async (req, res) => {

    try {


        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );



        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }



        // Activity after update

        await Activity.create({

            type:"order",

            title:"Order Updated",

            desc:`Order of ${order.customer} status updated`,

            color:"blue",

            time:"Just now"

        });



        res.json({

            message: "Order updated successfully",

            order

        });



    } catch (error) {


        console.log("Update Order Error:", error);


        res.status(500).json({

            message: error.message

        });


    }

};








// =========================
// DELETE ORDER
// =========================
exports.deleteOrder = async (req, res) => {

    try {


        const order = await Order.findByIdAndDelete(

            req.params.id

        );



        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }



        // Activity after delete

        await Activity.create({

            type:"order",

            title:"Order Deleted",

            desc:`Order of ${order.customer} removed`,

            color:"orange",

            time:"Just now"

        });



        res.json({

            message: "Order deleted successfully"

        });



    } catch (error) {


        console.log("Delete Order Error:", error);


        res.status(500).json({

            message: error.message

        });


    }

};