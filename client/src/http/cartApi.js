import {$authHost} from "./index";

export const fetchBasket = async (userId) => {
    const {data} = await $authHost.get(`user/${userId}/basket/`)
    return data
}

export const fetchBasketById = async (basketId) => {
    const {data} = await $authHost.get('basket/' + basketId)
    return data
}

export const addProductToCart = async (userId, products) => {
    const {data} = await $authHost.put(`user/${userId}/basket/`, {
        products: products,
    })
    return data
}

export const deleteProductFromCartOne = async (basket_id, product_id) => {
    console.log(basket_id)
    const {data} = await $authHost.delete('basket/' + basket_id, {
        params: {
            product_id: product_id,
            amount: -1
        }
    })
    return data
}

export const deleteProductFromCartAll = async (basket_id, product_id) => {
    const {data} = await $authHost.put('basket/' + basket_id, {
        product_id: product_id,
        amount: "all"
    })
    return data.deletedFromBasket
}

export const fetchProductsFromBasket = async (userId) => {
    const {data} = await $authHost.get(`user/${userId}/basket`)
    return data
}


export const clearBasket = async (basket_id) => {
    const {data} = await $authHost.put(`basket/${basket_id}`, {
            product_id: "all"
    })
    return data
}
