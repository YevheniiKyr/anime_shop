const productService = require("../services/productService.js");

class ProductController {

    async create(req, res, next) {
        try {
            const {img} = req.files
            const body = req.body
            const product = await productService.create(body, img);
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {products, count} = await productService.getProducts(req.query)
            res.json({products, count});
        } catch (e) {
            next(e)
        }
    }


    async getByID(req, res, next) {
        try {
            const {id} = req.params
            const product = productService.get(id)
            res.json(product);
        } catch (e) {
            next(e)
        }
    }


    async update(req, res, next) {
        try {
            const body = req.body;
            const {id} = req.params
            const updatedProduct = await productService.update(id, body);
            return res.json(updatedProduct);
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedProduct = await productService.delete(id);
            res.json(deletedProduct);
        } catch (e) {
            next(e)
        }
    }


}


module.exports = new ProductController()