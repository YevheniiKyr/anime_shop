import {$authHost} from "./index";

export const fetchOrder = async (id) => {
    const {data} = await $authHost.get('order/' + id)
    return data
}

export const createOrder = async (order) => {
    const {data} = await $authHost.post('order/', {order})
    return data

}
export const fetchOrders = async () => {
    const {data} = await $authHost.get('order/' )
    return data
}

export const updateOrderStatus = async (order) => {
    const {data} = await $authHost.put('order/' + order._id, order)
    return data
}

export const deleteOrder = async (id) => {
    const {data} = await $authHost.delete('order/' + id)
    return data
}