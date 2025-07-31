import {$authHost} from "./index";

export const fetchRecommendations = async (user_id) => {
    const {data} = await $authHost.get('collaborative_rec/', {
        params: {
            user_id: user_id
        }
    })
    return data
}


export const findSimilarByDesc = async (user_id, prod_id) => {
    const {data} = await $authHost.get('similar_desc/', {
        params: {
            user_id: user_id,
            prod_id: prod_id
        }
    })
    return data
}

export const findSimilarByAll = async (user_id, prod_id) => {
    const {data} = await $authHost.get('similar_all/', {
        params: {
            user_id: user_id,
            prod_id: prod_id
        }
    })
    return data
}