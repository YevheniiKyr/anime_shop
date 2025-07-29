import {$authHost, $host} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('category/', {
        name: category
    })
    return data
}

export const fetchCategories = async () => {
    console.log(`Fetching categories`)
    const {data} = await $host.get('category/')
    return data
}


export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('product/' + id)
    return data
}

export const fetchProducts = async (cat, search, page, limit, priceRange, alphabetOrder) => {
    console.log(`Fetching products`)
    const {data} = await $host.get('product/', {
        params: {
            category: cat?._id,
            searchQuery: search,
            page: page,
            limit: limit,
            minPrice: priceRange?.min,
            maxPrice: priceRange?.max,
            order: alphabetOrder
        }
    })
    return data
}

export const fetchProductsArray = async (id) => {
    const {data} = await $authHost.get('product/', {
        params: {
            id: id,
        }
    })
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('product/', product)
    return data
}

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


