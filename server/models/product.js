const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    review: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    img: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    description: {type: String, required: true},
    size: {type: String, default: 'def_size'},
    color: {type: String, default: 'def_color'},
}, {
    timestamps: true,
    toJSON: {virtuals: true}
})

ProductSchema.virtual('averageRating')

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)