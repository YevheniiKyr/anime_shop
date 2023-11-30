
import {makeAutoObservable} from "mobx";


export default class BasketStore {

    constructor() {

        this._basket = null
        this._products = [

        ]
        makeAutoObservable(this)
    }



    setBasket(basket) {
        this._basket = basket
    }

    setProducts(products) {
        this._products = products
    }

    get basket() {
        return this._basket
    }


    get products() {
        return this._products
    }

}