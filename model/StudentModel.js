const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({
    UserName:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    isAdmin:{type:Boolean},
    password:{
        unique:true,
        type:String,
    },
    image:{
        type:String,
        default:"https://res.cloudinary.com/dj2rasyos/image/upload/v1749388441/g0uckfqkiwuupbrjcdni.jpg",
    },
   
})


const model = mongoose.model("users" , studentSchema)

module.exports = model