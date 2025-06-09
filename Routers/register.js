const express = require("express");
const Router = express.Router()
const validStudent = require("../util/StudentValidate");
const users = require("../controllers/users");
const cors = require("cors")



Router.use(cors({
  origin: 'https://soblo-project.vercel.app/',
  credentials: true      ,
    exposedHeaders: ['x-auth-header'],         
}))

Router.use(express.json())

Router.post("/" , users.register);



module.exports = Router
