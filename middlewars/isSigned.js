const model  = require("../model/StudentModel")
const jwt = require("jsonwebtoken")
module.exports = (req,res,nxt) => {
    const token = req.header("x-auth-header");
    if (!token) {
        res.status(403).send("access denied")
    } else {
        nxt();
    }
};