const mongoose = require("mongoose");

//const Product = require('Product');

const Order = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
        products: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", Order);