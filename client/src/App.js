import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/authApi";
import {Context} from "./index";
import {fetchBasket} from "./http/basketApi";
import Loader from "./components/Loader";

function App() {

    const {userStore, basketStore} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const init = async () => {
        if (localStorage.getItem('token')) {
            const user = await check()
            userStore.setUser(user)
            userStore.setIsAuth(true)
            const basket = await fetchBasket(user._id)
            basketStore.setProducts(basket.products)
            basketStore.setBasketId(basket._id)
        }
    }

    useEffect(() => {
        init().catch().finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loader/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
