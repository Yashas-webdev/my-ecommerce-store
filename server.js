import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB  from './backend/config/db'

//Load env variables
dotenv.config()

//Connect to MongoDB
connectDB()

const app = express()

const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Test Route
app.get('/',(req,res)=>{
    res.send({
        message: '🚀 Elegant Shop API is running',
        status: 'success'
    })
})

//Start Server

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
