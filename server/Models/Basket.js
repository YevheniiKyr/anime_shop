const mongoose = require("mongoose");


const Basket = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Basket", Basket);