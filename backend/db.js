require('dotenv').config()
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNECT)

const userSchema = mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User : User
}