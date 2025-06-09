const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Router = require("./Routers/students")
const UserRouter = require("./Routers/register")
const LgoinRouter = require("./Routers/auth.js")
const admin_login = require("./Routers/admin.js")
const postsRouter = require("./Routers/posts.js")
const cors = require("cors")
const helmet = require("helmet")


const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/project").then((e) => {
    console.log("Connection Success")
}).catch((err) => {
    console.log("error =>" , err)
})


app.use(helmet())
app.use((req,res,nxt) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
nxt()
})



app.use("/api/posts" , postsRouter)
app.use("/api/users" , Router)
app.use("/api/register",UserRouter)

app.use("/api/login",LgoinRouter)
app.use("/api/admin_login",admin_login)

app.listen(PORT , () => console.log("success"))




