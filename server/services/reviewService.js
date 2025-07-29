const Review = require("../models/review");
const Product = require("../models/product");
const ApiError = require("../exceptions/apiError");

class ReviewService {

    async create(userId, productId, body) {
        const existingReview = await Review.findOne({user: userId});
        if(existingReview) {
            throw ApiError.BadRequestError("Review already exists");
        }
        console.log(productId);
        const product = await Product.findById(productId);
        if(!product) {
            throw ApiError.NotFoundError("Product not found");
        }
        const review = await Review.create({...body, product: productId, user: userId});
        const totalReviews = product.total_reviews;
        if(totalReviews === 0) {
            product.rating = review.rating
            product.total_reviews = 1
        }
        else {
            product.rating = (product.rating * totalReviews + review.rating) / (totalReviews + 1)
        }
        await product.save()
        return review
    }

    async getProductReviews(productId) {
        const reviews = await Review.find({product: productId})
        return reviews
    }

    async get(id){
        const review = await Review.findById(id);
        if(!review) {
            throw ApiError.NotFoundError("Review not found");
        }
        return review
    }

    async update(id, body) {
        const updatedReview = await Review.findByIdAndUpdate(id,  body, {new:true} );
        if(!updatedReview) {
            throw ApiError.NotFoundError("Review not found");
        }
        return updatedReview;
    }

    async delete(id) {
        const deletedReview = await Review.findByIdAndDelete(id);
        if(!deletedReview) {
            throw ApiError.NotFoundError("Review not found");
        }
        return deletedReview;
    }

    async deleteProductReviews(productId) {
        await Review.deleteMany({product: productId});
        return;
    }
}

module.exports = new ReviewService();