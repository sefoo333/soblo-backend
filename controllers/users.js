const express = require("express");
const app = express.Router();
const mongoose = require("mongoose")
const model = require("../model/StudentModel")
const validate = require("../util/StudentValidate")
const bcy = require("bcrypt");
const jwt = require("jsonwebtoken")
app.use(express.json())
const secretKey = "alawyhabebqalby"
const cors = require("cors")


const website = "https://soblo-project.vercel.app"

app.use(cors({
  origin:website,
  credentials: true, // إذا كنت تستخدم الكوكيز أو الجلسات
    exposedHeaders: ['x-auth-header'],         
}));


const register = async (req,res) => {

    const checker = await model.findOne({email:req.body.email}).exec();
    const salt = await bcy.genSalt(10);
const password = await bcy.hash(req.body.password,salt);
    if (!checker) {

    const newUser = await new model({
        UserName:req.body.UserName,
        email:req.body.email,
        password:password,
        isAdmin:req.body.isAdmin,
        image:"https://res.cloudinary.com/dj2rasyos/image/upload/v1749388441/g0uckfqkiwuupbrjcdni.jpg",
    })

    const token = jwt.sign({id:newUser._id , isAdmin:false} , secretKey)
res.setHeader("x-auth-header" , token)

        newUser.save().then(() => {
            res.send({
                status:200,
                massege:"success register",
                id:newUser._id,
            })
        }).catch(() => {
        res.status(400).send("please try it")
    })
} else {
    res.status(403).send("account already registred")
}
}





module.exports = {
    register,
}
