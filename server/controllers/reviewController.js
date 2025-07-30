const reviewService = require("../services/reviewService");

class ReviewController {

    async create(req, res, next) {
        try {
            const userId = req.user._id
            const body = req.body;
            const {productId} = req.params
            const review = await reviewService.create(userId, productId, body);
            return res.json(review)
        } catch (e) {
            next(e)
        }
    }

    async getAllProductReviews(req, res, next) {
        try {
            const {productId} = req.params
            const reviews = await reviewService.getProductReviews(productId);
            return res.json(reviews)
        } catch (e) {
            next(e)
        }
    }

    async getByID(req, res, next) {
        try {
            const id = req.params.id;
            const review = await reviewService.get(id)
            return res.json(review);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const review = req.body;
            const {productId, id} = req.params
            const updatedReview = await reviewService.update(productId, id, review);
            return res.json(updatedReview);
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {productId, id} = req.params
            const deletedReview = await reviewService.delete(productId, id);
            return res.json(deletedReview);
        } catch (e) {
            next(e)
        }
    }

    async deleteProductReviews(req, res, next) {
        try {
            const {productId} = req.params
            await reviewService.deleteProductReviews(productId);
            return res.json({success: true}).status(204);
        } catch (e) {
            next(e)
        }
    }

}


module.exports = new ReviewController()