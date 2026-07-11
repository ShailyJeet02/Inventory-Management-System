const mongoose = require("mongoose");


const supplierSchema = new mongoose.Schema(

{
    name:{
        type:String,
        required:true,
        trim:true
    },


    contact:{
        type:String,
        required:true,
        trim:true
    },


    phone:{
        type:String,
        required:true,
        trim:true
    },


    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },


    products:{
        type:Number,
        default:0
    },


    status:{
        type:String,
        enum:[
            "Active",
            "Inactive"
        ],
        default:"Active"
    },


    // User wise data
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},

{
    timestamps:true
}


);


module.exports = mongoose.model(
    "Supplier",
    supplierSchema
);