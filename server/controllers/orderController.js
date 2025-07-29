const orderService = require("../services/orderService.js");

class OrderController {

    async create(req, res, next) {
        try {
            const userId = req.user._id;
            const body = req.body
            const order = await orderService.create(userId, body);
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const order = await orderService.getAll();
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }

    async getByID(req, res, next) {
        try {
            const {id} = req.params
            const order = await orderService.get(id)
            res.json(order);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const order = req.body;
            const {id} = req.params;
            const updatedOrder = await orderService.update(id, order);
            return res.json(updatedOrder);
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedOrder = await orderService.delete(id);
           res.json(deletedOrder);
        } catch (e) {
            next(e)
        }
    }

}


module.exports = new OrderController()