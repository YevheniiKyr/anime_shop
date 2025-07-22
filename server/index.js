require(`dotenv`).config()
const express = require('express')
const mongoose = require("mongoose")
const path = require("path");
const cors = require("cors")
const fileUpload = require('express-fileupload')
const router = require("./routes/index");

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5009

const app = express()


mongoose.set('strictQuery', true)

mongoose.connect(DB_URL)
    .then(() => {
        console.log("✅ MongoDB connected");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
    });

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(router)


app.listen(PORT, ()=>console.log("server is started"))
