const express = require('express');
const app = express();
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary').v2; 
const dotenv = require('dotenv')
const cors = require('cors')

//handle uncaught exceptions
process.on('uncaughtException', err => {
    console.error(`Error: ${err.message}`)
    console.error('Shutting down the server due to uncaught exception')
    process.exit(1)
})

//This code tells server.js where to find the port
dotenv.config({path: 'BackEnd/config/.env'})

console.log('MONGO_URI:', process.env.MONGO_URI);

//Here I connect to the database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () =>{
    console.log(`Listening on Port: ${process.env.PORT} and currently in ${process.env.NODE_ENV}`)
    // console.log(req.user); 
})

//handle unhandled promise exceptions


