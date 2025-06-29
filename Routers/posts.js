const express = require("express");
const Router = express.Router()
const validStudent = require("../util/StudentValidate");
const posts = require("../controllers/Posts");
const isSigned = require("../middlewars/isSigned")
const cors = require("cors");
const isadmin = require("../middlewars/isadmin");
Router.use(express.json())
Router.use(cors({
  origin: 'https://soblo-project.vercel.app' || "http://localhost:3000",
  credentials: true      ,
    exposedHeaders: ['x-auth-header'],         
}))


Router.get("/" , posts.getAllPosts)
Router.get("/:id" , posts.getPostById)
Router.post("/createPost" , posts.Createpost)
Router.put("/updateViews" , isSigned , posts.calcView)
Router.put("/updatelikes" , isSigned , posts.calclike)
Router.put("/updateRemovelikes" , isSigned , posts.calcRemovelike)
Router.put("/comments" , isSigned , posts.writeComment)
Router.delete("/deletePost/:id" , isadmin , posts.DeletePost)
Router.put("/deleteComment/:id" , posts.DeleteComment)

module.exports = Router
