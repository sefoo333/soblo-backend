const express = require("express");
const Router = express.Router()
const validStudent = require("../util/StudentValidate");
const getStudents = require("../controllers/Students");
const cors = require("cors")
const adminrole = require("../middlewars/isadmin");


app.use(cors({
  origin: ['https://soblo-project.vercel.app',"http://localhost:3000"],  
  credentials: true      ,
    exposedHeaders: ['x-auth-header'],         
}))


Router.use(express.json())

Router.get("/" , getStudents.getAllUsers)
Router.get("/userNames/:userName" , getStudents.searchByUserName)
Router.get("/:id" , getStudents.searchById)
Router.post("/Addstudent",adminrole , getStudents.addStudent)
Router.put("/updateSTD/:id",adminrole , getStudents.UpdateStudent)
Router.delete("/DeleteSTD/:id",adminrole , getStudents.DeleteStudent)
Router.put("/makeAdmin/:id",adminrole , getStudents.makeItAdmin)
Router.put("/removeAdmin/:id",adminrole , getStudents.RemoveAdmin)

Router.put("/editProfile/:id", getStudents.EditAccount)


module.exports = Router
