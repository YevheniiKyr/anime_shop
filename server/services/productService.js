const {ObjectId} = require("bson");
const imagesService = require("./imagesService");
const Product = require("../models/product");
const Category = require("../models/category");
const Review = require("../models/review");
const ApiError = require("../exceptions/apiError");
const SortOrders = require("../controllers/SortOrders");

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
            let {priceRange, filterCategory, searchQuery, limit, page, alphabetOrder, id} = queryParams
            page = page || 1
            limit = limit || 15
            const offset = page * limit - limit
            let count = await Product.count();

            const filter = {};
            let order = SortOrders.Descent;

            if (id) {
                id = new ObjectId(id);
                filter._id = {$in: id};
            }

            if (filterCategory) {
                filter.category = filterCategory;
            }

            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'i');
                filter.title = regex;
            }

            if (priceRange) {
                const minPrice = priceRange.min
                const maxPrice = priceRange.max
                filter.price = {$gte: minPrice, $lte: maxPrice};
            }

            if (alphabetOrder) {
                order = SortOrders[alphabetOrder];
            }

            // const filteredCount = await Product.find(filter).countDocuments({});

            let products = await Product.find(filter)
                .sort({title: order})
                .skip(offset)
                .limit(limit);

            const filteredCount = products.length

            return {products, count: filteredCount};
    }

    async get(id) {
        const product = await Product.findById(id)
        if(!product) {
            throw ApiError.NotFoundError("Product not found")
        }
        return product;
    }

    async update(id, body) {
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {new: true});
        if(!updatedProduct) {
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

}

module.exports = new ProductService()