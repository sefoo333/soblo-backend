const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({
    PostName:{
        required:true,
        type:String,
    },
    Banner:{
        type:String,
        required:true,
    },
    writer:{type:String},
    content:{type:Object},
    comments:{
        type:Array,
    },
    tags:{type:Array},
    view:{type:Number},
    loves:{type:Array},
    Date:{
        type:Date,
        default:new Date(),
    }
   
})


const model = mongoose.model("posts" , studentSchema)

module.exports = model