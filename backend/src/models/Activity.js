const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema({

    type:{
        type:String
    },


    title:{
        type:String
    },


    desc:{
        type:String
    },


    color:{
        type:String
    },


    time:{
        type:String
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Activity",
    activitySchema
);