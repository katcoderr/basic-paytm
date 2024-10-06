require('dotenv').config()
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNECT)

const userSchema = mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String
})

const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User", userSchema)

module.exports = {
    User : User,
    Account : Account
}