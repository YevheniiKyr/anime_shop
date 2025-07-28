const Basket = require("../models/basket")

const basketService = require("../services/basketService");

class BasketController {

    async create(req, res, next) {
        try {
            const {user} = req.body
            const basket = await basketService.create(user)
            return res.json(basket).status(201)
        } catch (e) {
            next(e);
        }
    }

    async getByUser(req, res, next) {
        try {
            const userId = req.user._id;
            const basket = await basketService.getByUser(userId);
            return res.json(basket)
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const basket = await Basket.find({});
            return res.json(basket)
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const basket = await basketService.delete(id);
            return res.json(basket)
        } catch (e) {
            next(e);
        }
    }


    async update(req, res, next) {
        const {products} = req.body;
        const userId = req.user._id;
        try {
            const updatedBasket = await basketService.update(userId, products)
            return res.json(updatedBasket)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BasketController()