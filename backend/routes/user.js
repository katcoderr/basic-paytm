const express = require("express")
const router = express.Router()
const zod = require("zod")
const { User } = require("../db")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post("/signup", async (req,res)=>{
    const body = req.body
    const { success } = signupSchema.safeParse(body)
    if(!success){
        return res.status(411).json({
            msg : "Invalid Inputs"
        })
    }

    const userExists = User.findOne({
        username : body.username
    })

    if(userExists._id){
        return res.json({
            msg : "User alreay exists"
        })
    }

    const newUser = await User.create({
        username : body.username,
        firstName : body.firstname,
        lastName : body.lastname,
        password : body.password
    })

    const userId = newUser._id
    const token = jwt.sign({
        userId : userId,
    }, process.env.JWT_SECRET )

    res.json({
        msg : "User Created Successfully",
        token : token
    })
})


module.exports = router