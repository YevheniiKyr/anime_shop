const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    email: {type:String , required: true, unique: true },
    password: {type:String , required: true, unique: true},
    birthdate : {type:  Date },
    role: {type: String , required: true , default: "USER"},
}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)