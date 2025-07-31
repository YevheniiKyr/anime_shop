import {$authHost} from "./index";

export const fetchBasket = async (userId) => {
    const {data} = await $authHost.get(`user/${userId}/basket/`)
    return data
}

export const setProductsToBasket = async (userId, products) => {
    const {data} = await $authHost.put(`user/${userId}/basket/`, {
        products: products,
    })
    return data
}

export const clearBasket = async (userId) => {
    const {data} = setProductsToBasket(userId, [])
    return data
}
