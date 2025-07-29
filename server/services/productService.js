const imagesService = require("./imagesService");
const Product = require("../models/product");
const Category = require("../models/category");
const ApiError = require("../exceptions/apiError");
const SortOrders = require("../consts/SortOrders");

class ProductService {

    async create(body, image) {
        const {title, price, category, description, size, color} = body
        const fileName = await imagesService.uploadToCloudinary(image)
        const existingCategory = Category.findById(category)
        if (!existingCategory) {
            throw ApiError.NotFoundError("Category not found")
        }
        const product = await Product.create({title, price, img: fileName, category, description, size, color})
        return product
    }

    async getProducts(queryParams) {
        let {minPrice, maxPrice, category, searchQuery, limit, page, order, sortBy} = queryParams
        page = page || 1
        limit = limit || 15
        const offset = page * limit - limit
        let sortOrder = SortOrders.asc
        const filter = {};
        sortBy = sortBy || 'title';
        if (category) {
            filter.category = category;
        }
        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');
            filter.title = regex;
        }
        if (minPrice || maxPrice) {
            filter.price = {}
            minPrice && (filter.price.$gte = minPrice)
            maxPrice && (filter.price.$lte = maxPrice)

        }
        if (order) {
            sortOrder = SortOrders[order];
            console.log("sortOrder", sortOrder);
        }
        let products = await Product.find(filter)
            .sort({[sortBy]: sortOrder})
            .skip(offset)
            .limit(limit);
        const filteredCount = products.length
        return {products, count: filteredCount};
    }

    async get(id) {
        const product = await Product.findById(id)
        if (!product) {
            throw ApiError.NotFoundError("Product not found")
        }
        return product;
    }

    async update(id, body) {
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {new: true});
        if (!updatedProduct) {
            throw ApiError.NotFoundError("Product not found")
        }
        return updatedProduct;
    }

    async delete(id) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw ApiError.NotFoundError("Product not found")
        }
        await imagesService.deleteImage(deletedProduct.img)
        return deletedProduct;
    }
//
}

module.exports = new ProductService()