const mongoose = require("mongoose");

const Item = new mongoose.Schema({
    productId: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1,
    }
})
module.exports = Item;