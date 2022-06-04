const mongoose = require("mongoose");
const Product = new mongoose.Schema ({
    title: {type:String , required: true, unique: true },
    price: {type:Number , required: true},
    rating: {type:Number, required: true, default: 0},
    img: {type:String , required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true },
    description: {type:String , required: true},
    size: {type:String, default: 'def_size'},
    color: {type:String , default: 'def_color'},


}, {timestamps: true})
module.exports = mongoose.model('Product', Product)