const mongoose = require('mongoose');
const {Schema} = mongoose;

const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Payment', PaymentSchema);