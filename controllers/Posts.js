const express = require("express");
const app = express.Router();
const model = require("../model/PostsModel")
const model2 = require("../model/StudentModel")
const jwt = require("jsonwebtoken")
const cors = require("cors")
app.use(express.json())
const secretKey = "alawyhabebqalby"
const http = require("http");
const server = http.createServer(app)

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // ← ده هو الفرونت
    methods: ["GET", "POST"],
    credentials: true
  }
});


app.use(cors({
  origin: 'https://soblo-project.vercel.app/',
  credentials: true      ,
    exposedHeaders: ['x-auth-header'],         
}))




const getAllPosts = async (req,res) => {
    const students = await model.find();
    
    if (students){
        res.send(students)
    } else {
        res.status(400).send("Failed TO get data posts")
    }
}

const Createpost = async (req,res) => {
    const newPost = await new model({
        PostName:req.body.postName,
        writer:"seifeldeen Ali",
        Banner:req.body.Banner,
        comments:[],
        content:req.body.content,
        tags:req.body.tags,
        view:0,
        loves:0,
        Date:req.body.Date,
    })
    
    try{
        newPost.save()
        res.status(200).send({
            status:200,
            massege:"Success Post Created",
            id:newPost._id,
        })
    } catch(err){
        console.log("error => ", err)
    }

}

const getPostById = async (req,res) => {
    const getPost = await model.findById(req.params.id);
    console.log(getPost)
    if (getPost){
        res.status(200).send(getPost)
    }else{
        res.status(400).send({
            massege:"Error for fetching data",
            ssa:err,
            status:400
        })
    }
}

const calcView = async(req,res) => {
    const getPost = await model.findByIdAndUpdate(req.body.id,{view:req.body.view});
    
    try {
        res.status(200).send(getPost)
    } catch(err){
        res.status(404).send("failed =>" + err)
    }
    
    
    
    
}



const calclike = async(req,res) => {
    const getPost = await model.findById(req.body.id);
    const switchtoken = await jwt.verify(req.body.loves , secretKey);
    const getUser = await model2.findById(switchtoken.id).select({UserName:1 , image:1});
    const loves = getPost.loves.push({
        id:switchtoken.id,
UserName: getUser.UserName,
        image:getUser.image,
    })
    const getPostAndUpdate = await model.findByIdAndUpdate(req.body.id,{loves:getPost.loves});
    
    // io.on('connection', (socket) => {
    //   console.log('New client connected');
    
    
    
    //   // Send data to the client every second
    //   setInterval(() => {
    //       socket.emit('real-time-loves', { loves:  getPost.loves});
    //   }, 1000);
    
    //   socket.on('disconnect', () => {
    //       console.log('Client disconnected');
    //   });
    // });
    


    try {
        res.status(200).send({...getPostAndUpdate, id:switchtoken.id})
    } catch(err){
        res.status(404).send("failed =>" + err)
    }
}
const calcRemovelike = async(req,res) => {
    const getPost = await model.findById(req.body.id);
    const switchtoken = await jwt.verify(req.body.loves , secretKey);
    const loves = getPost.loves.filter((item) => item.id !== switchtoken.id)
    const getPostAndUpdate = await model.findByIdAndUpdate(req.body.id,{loves:loves});
    
    // io.on('connection', (socket) => {
    //   console.log('New client connected');
    
    
    
    //   // Send data to the client every second
    //   setInterval(() => {
    //       socket.emit('real-time-loves', { loves:  getPost.loves});
    //   }, 1000);
    
    //   socket.on('disconnect', () => {
    //       console.log('Client disconnected');
    //   });
    // });
    


    try {
        res.status(200).send({...getPostAndUpdate, id:switchtoken.id})
    } catch(err){
        res.status(404).send("failed =>" + err)
    }
}


const writeComment = async (req,res) => {

    const switchtoken = await jwt.verify(req.body.comments.token , secretKey);

    const getData = await model2.findById(switchtoken.id).select({UserName:1 , image:1});

    const getData2 = await model.findById(req.body.id).select({comments:1});

    if (!getData) console.log("error")

    const newComment = {
        commentContent:req.body.comments.commentContent,
        commentName:getData.UserName,
        commentDate:req.body.comments.commentDate,
        PhotoUrl:getData.image,
        idUser:switchtoken.id,
        idComment:Date.now(),
    }

let comments = getData2.comments.push({...newComment})

         const getPost = await model.findByIdAndUpdate(req.body.id,{comments:getData2.comments});
    
    try {
        res.status(200).send(getPost)
    } catch(err){
        res.status(404).send("failed =>" + err)
    }
}


const DeletePost = async (req,res) => {
    const getPost = await model.findByIdAndDelete(req.params.id);
    
    if (getPost){
        res.status(200).send({
            status:200,
            massege:"Success Post Deleted"
        })
    }else{
        res.status(400).send({
            massege:"Error for deleting data",
            ssa:err,
            status:400
        })
    }
}

const DeleteComment = async (req,res) => {
    const getPost = await model.findById(req.params.id);
    const getPostAndUpdate = await model.findByIdAndUpdate(req.params.id , {comments:getPost.comments.filter((item) => item.idComment !== req.body.commentId)});
    
    if (getPost){
        res.status(200).send({
            status:200,
            massege:"Success Comment Deleted",
            data:getPostAndUpdate,
        })
    }else{
        res.status(400).send({
            massege:"Error for deleting comment",
            ssa:err,
            status:400
        })
    }
}

module.exports = {
    getAllPosts,
    Createpost,
    getPostById,
    calcView,
    calclike,
    writeComment,
    DeletePost,
    DeleteComment,
    calcRemovelike,
    
}
