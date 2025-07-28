const Category = require("../models/category");
const ApiError = require("../exceptions/apiError");
const Basket = require("../models/basket");

class CategoryService {

    async create(name) {
        const existingCategory = await Category.findOne({ name: name })
        if(existingCategory) {
            throw ApiError.BadRequestError(`Category already exists`)
        }
        const category = await Category.create({name})
        return category
    }

    async getById(id) {
        const category = await Category.findById(id)
        if(!category) {
            throw ApiError.NotFoundError(`Category not found`)
        }
        return category
    }

    async delete(id) {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw ApiError.NotFoundError("Category not found")
        }
        return category
    }

    async update(id, category) {
        const existingCategory = await Category.findById(id)
        if (!existingCategory) {
            throw ApiError.NotFoundError("Category not found")
        }
        existingCategory.name = category.name
        await existingCategory.save()
        return existingCategory
    }
}

module.exports = new CategoryService();