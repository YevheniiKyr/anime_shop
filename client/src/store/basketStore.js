import {makeAutoObservable} from "mobx";

export default class BasketStore {

    constructor() {
        this._basketId = null
        this._products = []
        makeAutoObservable(this)
    }

    setBasketId(basketId) {
        this._basketId = basketId
    }

    setProducts(products) {
        this._products = products
    }

    get basketId() {
        return this._basketId
    }

    get products() {
        return this._products
    }

}