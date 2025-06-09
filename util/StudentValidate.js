const ajv = require("ajv").default


const Schema = {
    "type":"object",
    "properties":{
        "UserName":{"type":"string"},
        "email":{"type":"string" , "pattern":"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"},
        "password":{"type":"string",}
    },
    "required":["UserName" , "email" , "password"],
    
}


const myAjv = new ajv();

module.exports = myAjv.compile(Schema);