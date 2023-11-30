import {makeAutoObservable} from "mobx";


export default class OptionsStore {
    get path() {
        return this._path;
    }

    setPath(value) {
        this._path = value;
    }



    constructor() {

        this._path = ''
        makeAutoObservable(this)
    }




}