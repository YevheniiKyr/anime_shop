import {$authHost} from "./index";

export const fetchUser = async (id) => {
    const {data} = await $authHost.get('user/' + id)
    return data
}

export const fetchUsersArray = async (id) => {
    const {data} = await $authHost.get('user/', {
        params: {
            id: id,
        }
    })
    return data
}