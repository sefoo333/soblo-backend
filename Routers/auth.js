const express = require("express");
const Router = express.Router()
const validStudent = require("../util/StudentValidate");
const users = require("../controllers/users");
const model = require("../model/StudentModel")
const jwt = require("jsonwebtoken")
const secretKey = "alawyhabebqalby"
const bcy = require("bcrypt")

const cors = require("cors")
Router.use(express.json())

Router.use(cors({
  origin: 'https://soblo-project.vercel.app',
  credentials: true      ,
    exposedHeaders: ['x-auth-header'],         
}))

Router.post("/" , async (req,res) => {
    const checker = await model.findOne({email:req.body.email}).exec();
    
    if (checker){
        const checkPassword = await bcy.compare(req.body.password , checker.password)
        if (!checkPassword) {res.status(400).send("email or passwordd not correct")}
        else {
        const token = jwt.sign({id:checker.id , isAdmin:checker.isAdmin},secretKey);

        res.setHeader("x-auth-header" , token);
        console.log(checker)
        res.status(200).send({
            status:200,
            massege:"login done",
            id:checker._id,
            UserName:checker.UserName,
        })
        }
    } else {
        res.status(400).send("email or password not correct")
    }

});



module.exports = Router
