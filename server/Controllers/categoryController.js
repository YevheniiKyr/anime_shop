const Category = require("../Models/category");

class CategoryController {

    async create(req, res) {
        try {
            const {name} = req.body
            const category = await Category.create({name})
            return res.json(category)
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async getByID(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            return res.json(category)
        }
        catch(e){
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {


        try {
            const category = await Category.find();
            return res.json(category)
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async delete(req, res) {

        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            return res.json(category)

        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async update(req, res) {


        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true}
            );
            return res.json(category)
        }
        catch(e){
            res.status(500).json(e)
        }

    }
}

module.exports = new CategoryController()