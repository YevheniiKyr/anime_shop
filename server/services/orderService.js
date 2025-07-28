
const Order = require("../models/order");
const ApiError = require("../exceptions/apiError");

class OrderService {

    async create(body) {
        const order = await Order.create(body)
        return order
    }

    async getAll(){
        const orders = await Order.find({});
        return orders;
    }

    async get(id){
        const order = await Order.findById(id);
        if(!order){
            throw ApiError.NotFoundError(`Order with id ${id} not found`)
        }
        return order
    }

    async update(order){
        const id = order._id;
        if(!id){
           throw ApiError.BadRequestError(`Id is not specified`);
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
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