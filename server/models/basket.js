const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const {Types} = Schema;


const BasketSchema = new mongoose.Schema(
    {
        user: {type: Types.ObjectId, ref: 'User', required: true, unique: true},
        products: {
            type: [
                {
                    product: {type: Types.ObjectId, ref: 'Product'},
                    amount: {type: Number, required: true}
                }],
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Basket", BasketSchema);