// const express = require("express")
// require('dotenv').config()

import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
import sentimentRoute from "./route/sentiment.route.js"
import cors from 'cors'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const URI = process.env.MongoDBURI

//MonogoBD Connection


try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    
} catch (error) {
    console.log(error);
    
}

//Defining Routes:
app.use("/book",bookRoute)
app.use("/user",userRoute)
app.use("/api",sentimentRoute)

app.listen(PORT, () => {
    console.log(`App listening on port : ${PORT}`);
    
})