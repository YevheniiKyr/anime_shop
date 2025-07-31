const mongoose = require("mongoose");
const OrderStatuses = require("../consts/orderStatuses");

const OrderSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        products: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                amount: {type: Number, required: true}
            }],
        address: {
            street: {type: String},
            house_num: {type: String},
            apartment_num: {type: String, required: false}
        },
        status: {type: String, default: OrderStatuses.Pending, enum: Object.values(OrderStatuses), required: true},
        total: {type: Number, default: 0}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)