require(`dotenv`).config()

const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require('./middlewares/notFoundHandler');

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5009


mongoose.set('strictQuery', true)
mongoose.connect(DB_URL)
    .then(() => {
        console.log("✅ MongoDB connected");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
    });

const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use('*', notFound);

app.use(errorHandler)

app.listen(PORT, () => console.log("server is started"))
