const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            msg : "Error"
        })
    }

    const token = authHeader.split(" ")[1]

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if(decodedToken){
        req.userid = decodedToken.userId
        next()
    }else{
        return res.status(403).json({})
    }
}


module.exports = {
    authMiddleware : authMiddleware
}