const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE ORDER
router.post("/", authMiddleware, async(req,res)=>{

    try{

        const order = await Order.create({

            orderType:req.body.orderType,
            customer:req.body.customer,
            date:req.body.date,
            amount:req.body.amount,
            status:req.body.status,

            createdBy:req.user.id

        });


        res.status(201).json(order);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// GET ORDERS WITH FILTER

router.get("/", authMiddleware, async(req,res)=>{

    try{


        const {
            status,
            startDate,
            endDate,
            orderType,
            search
        } = req.query;



        let filter={
            createdBy:req.user.id
        };



        if(status){

            filter.status=status;

        }



        if(orderType){

            filter.orderType=orderType;

        }



        if(startDate && endDate){

            filter.date={
                $gte:new Date(startDate),
                $lte:new Date(endDate)
            };

        }



        if(search){

            filter.customer={
                $regex:search,
                $options:"i"
            };

        }



        const orders = await Order.find(filter)
        .sort({
            createdAt:-1
        });



        res.json(orders);



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});





// UPDATE

router.put("/:id",authMiddleware,async(req,res)=>{

    try{


        const order=await Order.findOneAndUpdate(

            {
                _id:req.params.id,
                createdBy:req.user.id
            },

            req.body,

            {
                new:true
            }

        );


        if(!order){

            return res.status(404).json({
                message:"Order not found"
            });

        }


        res.json(order);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});






// DELETE

router.delete("/:id",authMiddleware,async(req,res)=>{

    try{


        const order=await Order.findOneAndDelete({

            _id:req.params.id,
            createdBy:req.user.id

        });



        if(!order){

            return res.status(404).json({
                message:"Order not found"
            });

        }



        res.json({
            message:"Order deleted successfully"
        });



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



module.exports=router;