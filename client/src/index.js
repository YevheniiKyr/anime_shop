import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/userStore";
import ProductStore from "./store/productStore";
import BasketStore from "./store/basketStore";
import ReviewStore from "./store/reviewStore";
import OptionsStore from "./store/optionsStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                userStore: new UserStore(),
                productStore: new ProductStore(),
                basketStore: new BasketStore(),
                reviewStore: new ReviewStore(),
                optionsStore: new OptionsStore()
            }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
);
