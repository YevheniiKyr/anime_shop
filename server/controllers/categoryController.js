const categoryService = require("../services/categorySevice");

class CategoryController {

    async create(req, res, next) {
        try {
            const {name} = req.body
            const category = await categoryService.create(name)
            return res.json(category).status(201)
        }
        catch(e){
            next(e)
        }
    }

    async getByID(req, res, next) {
        try {
            const id = req.params.id
            const category = await categoryService.get(id)
            return res.json(category)
        }
        catch(e){
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const category = await categoryService.getAll();
            return res.json(category)
        }
        catch(e){
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const category = await categoryService.delete(id);
            return res.json(category)
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const category = req.body
            const updatedCategory = await categoryService.update(id, category)
            return res.json(updatedCategory)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategoryController()