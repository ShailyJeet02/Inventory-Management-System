const mongoose = require("mongoose");


const settingsSchema = new mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},


companyName:{
    type:String,
    default:"InventoryPro"
},


email:{
    type:String
},


phone:{
    type:String
},


address:{
    type:String
},



lowStock:{
    type:Boolean,
    default:true
},


orderNotification:{
    type:Boolean,
    default:true
},


emailNotification:{
    type:Boolean,
    default:true
},


darkMode:{
    type:Boolean,
    default:false
},



createdAt:{
    type:Date,
    default:Date.now
}


});


module.exports = mongoose.model("Setting",settingsSchema);