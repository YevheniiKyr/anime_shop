const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const Review = new mongoose.Schema ({
product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
},
user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
},
rating: {
    type: Number,
    default: 0
},
text: {
    type:String,
    default: ''
}
}, {timestamps: true})
module.exports = mongoose.model('Review', Review)