const mongoose = require('mongoose')
const {Schema} = mongoose;
const {Types} = Schema;

const ProductSchema = new Schema({
    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    review: [{type: Types.ObjectId, ref: 'Review'}],
    img: {type: String, required: true},
    category: {type: Types.ObjectId, ref: 'Category', required: true},
    description: {type: String, required: true},
    size: {type: String, default: 'def_size'},
    color: {type: String, default: 'def_color'},
    rating: {type: Number, required: false, default: 0},
    total_reviews: {type: Number, required: false, default: 0},
}, {
    timestamps: true,
})


module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)