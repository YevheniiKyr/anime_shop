const orderService = require("../services/orderService.js");

class OrderController {

    async create(req, res, next) {
        try {
            const order = await orderService.create(req.body);
            return res.json(order)
        } catch (e) {
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
            const updatedOrder = orderService.update(req.body);

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