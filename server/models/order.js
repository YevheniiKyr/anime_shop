const mongoose = require("mongoose");
const {Schema} = mongoose;
const {Types} = Schema;
const OrderStatuses = require("../consts/orderStatuses");

const OrderSchema = new Schema(
    {
        user: {type: Types.ObjectId, ref: 'User', required: true},
        products: [
            {
                product: {type: Types.ObjectId, ref: 'Product'},
                amount: {type: Number, required: true}
            }],
        address: {type: String, required: true},
        status: {type: String, default: OrderStatuses.Pending, enum: Object.values(OrderStatuses), required: true},
        total: {type: Number, default: 0}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)