const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    text: {
        type: String,
        default: '',
        required: true
    }
},
 {
    timestamps: true,
    toJSON: {virtuals: true}
})

module.exports = mongoose.model('Review', ReviewSchema)