
const Review = require("../Models/review");

class reviewController {

    async create (req,res) {

        try {

            const review = req.body
            const review_created = await Review.create(review)

            return res.json(review_created)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    //all reviews of product
    async getAllReviewsAboutProduct (req,res) {
        try {

            const {product_id} = req.query
            console.log(product_id)
            const reviews = await Review.find({product: product_id})

            return res.json(reviews)

        } catch (e) {
            res.status(500).json(e)
        }


    }

    async getByID (req,res) {
        try {
            const review = await Review.findById(req.params.id);
            res.json(review);
        } catch(e){
            res.status(500).json(e)
        }

    }

    async update(req,res) {
        try {
            const review = req.body;
            const updatedReview = await Review.findByIdAndUpdate(req.params.id,  review, {new:true} );
            return res.json(updatedReview);
        } catch(e){
            res.status(500).json(e)
        }

    }

    async delete (req,res) {
        try {
            const {id} = req.params
            if(!id){
                res.status(400).json({message: 'no id'});
            }
            const deletedReview = await Review.findByIdAndDelete(id);

            if(deletedReview == null)
            {
                res.json({message :"Cant find book with this id"})
            }
            else res.json(deletedReview);
        } catch(e){
            res.status(500).json(e)
        }

    }


    async deleteAll() {

        Review.deleteMany({}, (err) => {
            if (err) {
                console.log(err);
            } else {
            }
        })


    }

}


module.exports = new reviewController()