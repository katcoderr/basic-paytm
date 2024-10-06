const express = require("express")
const router = express.Router()
const zod = require("zod")
const { User } = require("../db")
const jwt = require("jsonwebtoken")
const { authMiddleware } = require("../middleware")
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

    const userExists = await User.findOne({
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

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin", async (req,res)=>{
    const body = req.body
    const { success } = signinSchema.safeParse(body)
    if(!success){
        return res.json({
            msg : "Invalid inputs"
        })
    }

    const dbUser = await User.findOne({
        username : body.username
    })

    if(!dbUser._id){
        return res.json({
            msg : "User not found"
        })
    }

    const token = jwt.sign({
        userId : dbUser._id
    }, process.env.JWT_SECRET)

    res.json({
        token : token
    })
})

const updateUserSchema = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/", authMiddleware, async (req,res)=>{
    const body = req.body
    const { success } = updateUserSchema.safeParse(body)
    if(!success){
        return res.json({
            msg : "Error"
        })
    }
    await User.updateOne({_id:req.userId}, body)

    res.json({
        msg : "Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router