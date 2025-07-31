const Category = require("../models/category");
const ApiError = require("../exceptions/apiError");

class CategoryService {

    async create(name) {
        const existingCategory = await Category.findOne({ name: name })
        if(existingCategory) {
            throw ApiError.BadRequestError(`Category already exists`)
        }
        const category = await Category.create({name})
        return category
    }

    async get(id) {
        const category = await Category.findById(id)
        if(!category) {
            throw ApiError.NotFoundError(`Category not found`)
        }
        return category
    }

    async getAll(){
        const categories = await Category.find({});
        return categories;
    }

    async delete(id) {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw ApiError.NotFoundError("Category not found")
        }
        return category
    }

    async update(id, category) {
        const existingCategory = await Category.findByIdAndUpdate(id, category, {new: true, runValidators: true})
        if (!existingCategory) {
            throw ApiError.NotFoundError("Category not found")
        }
        return existingCategory
    }
}

module.exports = new CategoryService();