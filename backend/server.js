import dotenv from "dotenv"
dotenv.config()
import connectDb from "./src/config/db.js"
import app from "./src/index.js"


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})