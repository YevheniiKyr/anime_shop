const Order = require("../models/order");
const Product = require("../models/product");
const ApiError = require("../exceptions/apiError");

class OrderService {

    async countTotal(body){
        const productIds = body.products.map(product => product.product);
        const products = await Product.find({_id: {$in : productIds}});
        const total = body.products.reduce((total, product) => total + products.find(p => p._id == product.product).price * product.amount, 0);
        return total;
    }

    async create(userId, body) {
        const total = await this.countTotal(body);
        const order = await Order.create({...body, user: userId, total})
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

    async update(id, order){
        const total = await this.countTotal(order);
        const updatedOrder = await Order.findByIdAndUpdate(id, {...order, total}, { new: true });
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