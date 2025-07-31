const Order = require("../models/order");
const ApiError = require("../exceptions/apiError");

class OrderService {

    async create(userId, body) {
        const order = await Order.create({...body, user: userId})
        return order
    }

    async getAll(){
        const orders = await Order.find({}).populate('user');
        return orders;
    }

    async get(id){
        const order = await Order.findById(id);
        if(!order){
            throw ApiError.NotFoundError(`Order with id ${id} not found`)
        }
        return order
    }

    async update(id, order){

        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true, runValidators: true });
        if (!updatedOrder) {
            throw ApiError.NotFoundError(`Order with id ${id} not found`);
        }

        return updatedOrder;
    }

    async delete(id){
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            throw ApiError.NotFoundError(`Order with id ${id} not found`);
        }
        return order;
    }

}

module.exports = new OrderService()