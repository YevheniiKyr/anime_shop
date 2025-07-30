import {$authHost, $host} from "./index";


export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('product/' + id)
    return data
}

export const fetchProducts = async (cat, search, page, limit, priceRange, alphabetOrder) => {
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

export const createProduct = async (product) => {
    const {data} = await $authHost.post('product/', product)
    return data
}



