const Review = require("../models/review");
const Product = require("../models/product");
const ApiError = require("../exceptions/apiError");

class ReviewService {

    async create(userId, productId, body) {
        const existingReview = await Review.findOne({user: userId});
        if(existingReview) {
            throw ApiError.BadRequestError("Review already exists");
        }
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
            product.total_reviews = totalReviews + 1

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

    async update(productId, id, body) {
        const reviewToUpdate = await Review.findByIdAndUpdate(id,  body, {new:false, runValidators: true} );
        if(!reviewToUpdate) {
            throw ApiError.NotFoundError("Review not found");
        }
        const product = await Product.findById(productId);
        if(!product) {
            throw ApiError.NotFoundError("Product not found");
        }
        const totalReviews = product.total_reviews;
        if(totalReviews === 1) {
            product.rating = body.rating;
        }
        else {
            product.rating = (product.rating * totalReviews - reviewToUpdate.rating + body.rating) / totalReviews
        }
        await product.save()
        const updatedReview = await Review.findById(id)
        return updatedReview;
    }

    async delete(productId, id) {
        const product = await Product.findById(productId);
        if(!product) {
            throw ApiError.NotFoundError("Product not found");
        }
        const deletedReview = await Review.findByIdAndDelete(id);
        if(!deletedReview) {
            throw ApiError.NotFoundError("Review not found");
        }
        const totalReviews = product.total_reviews;
        if(totalReviews === 1) {
            product.rating = 0
            product.total_reviews = 0
        }
        else {
            product.rating = (product.rating * totalReviews - deletedReview.rating) / (totalReviews -1)
            product.total_reviews = totalReviews - 1
        }
        await product.save()
        return deletedReview;
    }

    async deleteProductReviews(productId) {
        const product = await Product.findById(productId);
        if(!product) {
            throw ApiError.NotFoundError("Product not found");
        }
        product.total_reviews = 0;
        product.rating = 0;
        await product.save()
        await Review.deleteMany({product: productId});
        return;
    }
}

module.exports = new ReviewService();