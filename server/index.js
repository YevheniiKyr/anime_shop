const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000
const cors = require('cors')
//const DB_URL = "mongodb+srv://NAME:PASSWORD@cluster0.lpew6.mongodb.net/?retryWrites=true&w=majority"

const DB_URL = process.env.DB_URL;
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const path = require("path");
const server = express()
server.use(express.json())
server.use(express.static(path.resolve(__dirname, 'static')))
server.use(cors)
server.use(cookieParser);
server.use(fileUpload({
 useTempFiles: true
}))

server.use('/api', router)
//server.use('/api', prodRouter)
server.get('/',async(req, res) => {

 try {
  res.json({message:"message"});
 } catch(e){
  res.status(500).json(e)
 }
 })
server.listen(PORT)
console.log("port" + PORT)


 //mongoose.connect(DB_URL,err=>{
//   if(err) throw err;
//});
//mongoose.connect(DB_URL, err =>{
 //   if(err) throw err;
 //   console.log('Connected to MongoDB')
//})
//server.post('/', )
/*server.get('/api', async(req, res) => {

    try {
        res.json({message:"message"});
    } catch(e){
        res.status(500).json(e)
    }

})*/








