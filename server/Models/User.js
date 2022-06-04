const mongoose = require("mongoose");
const User = new mongoose.Schema ({
    email: {type:String , required: true, unique: true },
    password: {type:String , required: true, unique: true},
    admin: {type: Boolean , required: true , default: false},

}, {timestamps: true})
module.exports = mongoose.model('User', User)