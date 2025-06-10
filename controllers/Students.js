const express = require("express");
const app = express.Router();
const mongoose = require("mongoose")
const model = require("../model/StudentModel")
const validate = require("../util/StudentValidate");
const isadmin = require("../middlewars/isadmin");
const bcrypt = require("bcrypt")
app.use(express.json())

const getAllUsers = async (req,res) => {
const students = await model.find().select({UserName:1 , email:1 , isAdmin:1 , image:1 , id:1});

if (students){
    res.send(students)
} else {
    res.status(400).send("Failed TO get data")
}
}


const searchByUserName = async (req ,res) => {
    const findStudent = await model.find({UserName:req.params.userName})
     if (findStudent) {
        console.log(findStudent)
        res.send(findStudent)
    }else {
        res.status(400).send("student is not found");
    }
   
}
const searchById = async (req ,res) => {
    const findStudent = await model.findById(req.params.id).select({UserName:1 , image:1 , email:1  , id:1});
     if (findStudent) {
        console.log(findStudent)
        res.send(findStudent)
    }else {
        res.status(400).send("student is not found");
    }
   
}


const EditAccount = async (req,res) => {
const findStudent = await model.findByIdAndUpdate(req.params.id , {
    UserName:req.body.UserName,
    image:req.body.image,
} , {returnOriginal:false});

if (findStudent) {
    res.send({
        status:200,
        massege:"success edit account",
        id:findStudent._id,
        account:findStudent,
    })

} else {
    res.status(400).send("failed to edit account")
}
}

const addStudent = async (req,res) => {

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,salt)
    
    let Student = await new model({
        UserName:req.body.UserName,
        email:req.body.email,
        password:password,
        })

    const validor = validate(req.body) 

 if (validor){
       Student.save().then(() => {
        res.send("Success")
    }).catch((err) => {
        res.status(400).send("Failed =>" + err)
    })
 } else {
    res.status(403).send("for beddien command")
 }


}
const UpdateStudent = async (req,res) => {
    
    let Student = await model.findByIdAndUpdate(req.params.id,req.body,{returnOriginal:false})

 if (Student){
        res.send(Student)
 } else {
    res.status(403).send("error")
 }


}
const DeleteStudent = async (req,res) => {
    
    let Student = await model.findByIdAndDelete(req.params.id)
 if (Student){
        res.send(`success delete student id: ${req.params.id}`)
 } else {
    res.status(403).send("error")
 }


}


const makeItAdmin = async (req,res) => {
    const user = await model.findByIdAndUpdate(req.params.id , {isAdmin:true} , {returnOriginal:false})
    if (user) {
        res.send({
            status:200,
            massege:"success make it admin",
            id:user._id,
        })
    } else {
        res.status(400).send("failed to make it admin")
    }
}
const RemoveAdmin = async (req,res) => {
    const user = await model.findByIdAndUpdate(req.params.id , {isAdmin:false} , {returnOriginal:false})
    if (user) {
        res.send({
            status:200,
            massege:"success make it admin",
            id:user._id,
        })
    } else {
        res.status(400).send("failed to make it admin")
    }
}

module.exports = {
    searchById,
    getAllUsers,
    addStudent,
    UpdateStudent,
    DeleteStudent,
    makeItAdmin,
    RemoveAdmin,
    searchByUserName,
    EditAccount,
}




