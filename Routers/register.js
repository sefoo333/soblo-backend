const express = require("express");
const Router = express.Router()
const validStudent = require("../util/StudentValidate");
const users = require("../controllers/users");
const cors = require("cors")



const website = "https://soblo-project.vercel.app"

Router.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (website == origin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // إذا كنت تستخدم الكوكيز أو الجلسات
    exposedHeaders: ['x-auth-header'],         
}));
Router.use(express.json())

Router.post("/" , users.register);



module.exports = Router
