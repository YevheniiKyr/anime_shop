import {$authHost} from "./index";

export const fetchBasket = async (user) => {
    const {data} = await $authHost.get('basket/', {
        params: {
            user: user
        }
    })
    return data
}

export const fetchBasketById = async (basket_id) => {
    const {data} = await $authHost.get('basket/' + basket_id)
    return data
}

export const addProductToCart = async (basket_id, product_id, amount) => {
    const {data} = await $authHost.put('basket/' + basket_id, {
        product_id: product_id,
        amount: amount
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

export const fetchProductsFromBasket = async (basket_id) => {
    const {data} = await $authHost.get('product/', {
        params: {
            basket_id: basket_id
        }
    })
    return data
}


export const clearBasket = async (basket_id) => {
    const {data} = await $authHost.put(`basket/${basket_id}`, {
            product_id: "all"
    })
    return data
}
