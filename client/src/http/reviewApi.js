import {$authHost} from "./index";

export const fetchReviews = async (productId) => {
    const {data} = await $authHost.get(`product/${productId}/review/`)
    return data
}

export const addReviewToProduct = async (productId, review) => {
    const {data} = await $authHost.post(`product/${productId}/review/`, review)
    return data
}

export const updateReview = async (productId, review) => {
    const {data} = await $authHost.put(`product/${productId}/review/${review._id}`, review)
    return data
}

export const deleteReview = async (productId, reviewId) => {
    const {data} = await $authHost.delete(`product/${productId}review/${reviewId}`)
    return data
}