import "dotenv/config";
import connectDb from "./src/config/db.js"
import app from "./src/index.js"
import cors from "cors"

import express from "express"
connectDb()

app.listen(process.env.PORT,()=>{

    

    console.log(`Server is running on port ${process.env.PORT}`)
})