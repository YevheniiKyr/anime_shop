const mongoose = require("mongoose");
const Roles = require("../consts/roles");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthdate: {type: Date},
    role: {type: String, required: true, default: Roles.User, enum: Object.values(Roles)},
}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)