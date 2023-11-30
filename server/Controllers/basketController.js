const Basket = require("../Models/basket")
const User = require("../Models/user")

const {ObjectId} = require("bson");

class BasketController {


    async create(req, res) {
        try {
            const {user} = req.body
            const existingUser = await User.findById(user)
            if (!existingUser) {
                res.status(500).json("user non exist")
            }
            const existingBasket = await Basket.findById(user);
            if (!existingBasket) {
                res.status(500).json("Basket already exist")
            }

            const basket = await Basket.create({user: user})
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByID(req, res) {
        try {
            const basket = await Basket.findById(req.params.id);
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByUser(req, res) {

        try {

            let basket = await Basket.findOne({user: req.query.user});
            if (!basket) {
                res.status(500).json("user non exist")
            }
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const basket = await Basket.find();
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async delete(req, res) {
        try {

            const basket = await Basket.findByIdAndDelete(req.params.id);
            return res.json(basket)
        } catch (e) {
            res.status(500).json(e)
        }

    }


    async update(req, res) {

        const {product_id, amount} = req.body;

        try {
            // Find the basket with the specified ID
            const basket = await Basket.findById(req.params.id)

            if (!basket) {
                // If the product is not found, return an error response
                res.status(404).json({error: 'Basket not found'});
                return;
            }

            if (product_id === 'all') {
                basket.products = []
            } else {

                // Check if the product is already in the cart
                const existingProduct = basket.products.find(p =>
                    JSON.stringify(p.product) === JSON.stringify(new ObjectId(product_id))
                )


                if (existingProduct) {
                    if (amount.toString() === 'all') {
                        basket.products = basket.products.filter(prod => prod.product !== existingProduct.product)
                        const deletedFromBasket = await Basket.findByIdAndUpdate(req.params.id, basket, {new: true})
                        res.json({message: 'Product deleted from cart', deletedFromBasket});
                        return
                    }

                    existingProduct.amount += amount;

                } else {
                    basket.products.push({product: product_id, amount: amount});
                }
            }

            const basketUpdated = await Basket.findByIdAndUpdate(req.params.id, basket, {new: true})

            res.json({message: 'Product added to cart', basketUpdated});

        } catch (e) {
            res.status(500).json(e)

        }


    }

}

module.exports = new BasketController()