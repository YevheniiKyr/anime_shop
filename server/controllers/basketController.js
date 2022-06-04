const Basket = require("../Models/Basket");

class BasketController {

    async create (req,res) {
        try {
            //res.json(req.body);
            const {author, title, publisher} = req.body
            const book = await Basket.create({author, title, publisher})
            res.json(book);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll (req,res) {
        try {
            //res.json(req.body);
            const books = await Basket.find();
            res.json(books);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByID (req,res) {
        try {
            //res.json(req.body);
            const book = await Basket.findById(req.params.id);
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
            const updatedBook = await Basket.findByIdAndUpdate(book._id,  book, {new:true} );
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
            const deletedBook = await Basket.findByIdAndDelete(id);
            if(deletedBook == null){res.json({message :"Cant find book with this id"})}
            else res.json(deletedBook);
        } catch(e){
            res.status(500).json(e)
        }

    }


}


module.exports = new BasketController()