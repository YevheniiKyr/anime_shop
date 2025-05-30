import {makeAutoObservable} from "mobx";

export default class OptionsStore {

    constructor() {
        this._path = ''
        makeAutoObservable(this)
    }

    get path() {
        return this._path;
    }

    setPath(value) {
        this._path = value;
    }

}