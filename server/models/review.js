const mongoose = require('mongoose')
const {Schema} = mongoose;
const {Types} = Schema;

const ReviewSchema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
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