const model  = require("../model/StudentModel")
const jwt = require("jsonwebtoken")
module.exports = (req,res,nxt) => {
    const token = req.header("x-auth-header");
    if (!token) res.status(403).send("access denied")
        const data = jwt.verify(token , "alawyhabebqalby");
if (!data.isAdmin) {res.status(401).send("you don't have premissons for this command")} 
else {
    nxt();
};
}