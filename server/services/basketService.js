const User = require("../models/user");
const Basket = require("../models/basket");
const Product = require("../models/product");
const ApiError = require("../exceptions/apiError");

class BasketService {

    async create(userId) {
        const existingUser = await User.findById(userId)
        if (!existingUser) {
            throw ApiError.NotFoundError("User with id " + userId + " not found");
        }
        const existingBasket = await Basket.findOne({user:userId});
        if (existingBasket) {
            throw ApiError.BadRequestError("Basket already exists")
        }
        const basket = await Basket.create({user: userId})
        return basket
    }

    async getByUser(userId) {
        let basket = await Basket.findOne({user: userId});
        if (!basket) {
            throw ApiError.NotFoundError("Basket not found")
        }
        await basket.populate('products.product')
        return basket
    }

    async delete(id) {
        const basket = await Basket.findByIdAndDelete(id);
        if (!basket) {
            throw ApiError.NotFoundError("Basket not found")
        }
        return basket
    }

    async update(userId, products) {
        const basket = await Basket.findOne({user:userId})
        if (!basket) {
            throw ApiError.NotFoundError("Basket not found")
        }

        for(const product of products) {
            let existingProduct;
            try {
                existingProduct = await Product.findById(product.product)
            } catch (e) {
                throw ApiError.BadRequestError("Product id " + product.product + " is not valid");
            }
            if (!product) {
                throw ApiError.NotFoundError("Product not found")
            }
        }

        basket.products = products
        await basket.save()
        await basket.populate('products.product')
        return basket
    }
}

module.exports = new BasketService()