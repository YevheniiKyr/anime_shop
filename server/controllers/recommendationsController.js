const Product = require("../models/Product");
const User = require("../models/User");
const axios = require("axios");

class RecommendationsController {

    async getCollaborative(req, res) {
        const {user_id} = req.query
        const users = await User.find()
        const user_idx = users.findIndex(user => (user._id.toString().trim()) === user_id.trim())
        const {data} = await axios.get('http://localhost:5000/collaborative_recommendations', {
                params: {
                    user_idx: user_idx
                }
            }
        )
        const idx = data.map(data => data.id)
        const products = await Product.find()
        const products_from_indexes = idx.map(id => products[id]).filter(product => product !== undefined);
        res.json(products_from_indexes)
    }


    async getHybridByAll(req, res) {
        const {prod_id, user_id} = req.query
        const products = await Product.find()
        const prod_idx = products.findIndex(prod => prod._id.toString().trim() === prod_id.trim())
        const users = await User.find()
        const user_idx = users.findIndex(user => (user._id.toString().trim()) === user_id.trim() )

        const {data} = await axios.get('http://localhost:5000/similar_features', {
            params: {
                prod_idx: prod_idx,
                products:  JSON.stringify(products),
                user_idx: user_idx
            }
        })
        const idx = data.map(data => data.id)
        const products_from_indexes = idx.map(id => products[id]).filter(product => product !== undefined);

        res.json(products_from_indexes)
    }


    async getByDescription(req, res) {
        const {prod_id, user_id} = req.query
        const products = await Product.find()
        const prod_idx = products.findIndex(prod => prod._id.toString().trim() === prod_id.trim())
        const users = await User.find()
        const user_idx = users.findIndex(user => (user._id.toString().trim()) === user_id.trim() )

        const {data} = await axios.get('http://localhost:5000/similar_description', {
            params: {
                prod_idx: prod_idx,
                products:  JSON.stringify(products),
                user_idx: user_idx
            }
        })
        const idx = data.map(data => data.id)
        const products_from_indexes = idx.map(id => products[id]).filter(product => product !== undefined);
        res.json(products_from_indexes)
    }

}

module.exports = new RecommendationsController()
