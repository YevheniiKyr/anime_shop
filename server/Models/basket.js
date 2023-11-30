const mongoose = require("mongoose");
const {Schema} = require("mongoose");


const Basket = new mongoose.Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
        products: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                amount: {type: Number, required: true}
            }],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Basket", Basket);