const Product = require("../Models/Basket");
const uuid = require('uuid')
const path = require("path");
//const path = require('path')
class ProductController {

    async create (req,res) {
     /*   try {
            //res.json(req.body);
            const {name, price, id_category, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const prod = await Product.create({name, price, fileName, id_category, description })

            res.json(prod);
        } catch (e) {
            res.status(500).json(e)
        }*/
        return res.json({msg: "dddd"})
    }

    async getAll (req,res) {
     /*   try {
            //res.json(req.body);
            const books = await Product.find();
            res.json(books);
        } catch (e) {
            res.status(500).json(e)
        }*/
        res.json({msg: "djjdjd"})
    }

    async getByID (req,res) {
        try {
            //res.json(req.body);
            const book = await Product.findById(req.params.id);
            res.json(book);
        } catch(e){
            res.status(500).json(e)
        }

    }

    async update(req,res) {
        try {
            //res.json(req.body);
            const book = req.body;
            if(!book._id){
                res.status(400).json({message: 'no id'});
            }
            const updatedBook = await Product.findByIdAndUpdate(book._id,  book, {new:true} );
            return res.json(updatedBook);
        } catch(e){
            res.status(500).json(e)
        }

    }
    async delete (req,res) {
        try {
            //res.json(req.body);
            const {id} = req.params
            if(!id){
                res.status(400).json({message: 'no id'});
            }
            const deletedBook = await Product.findByIdAndDelete(id);
            if(deletedBook == null){res.json({message :"Cant find book with this id"})}
            else res.json(deletedBook);
        } catch(e){
            res.status(500).json(e)
        }

    }


}


module.exports = new ProductController()