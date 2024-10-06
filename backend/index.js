const express = require("express")
const app = express()
const router = require("./routes/index")

app.use("/api/v1", router)

app.listen(3000, ()=>{
    console.log("Server Started");
    
})
