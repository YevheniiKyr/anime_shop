import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/authApi";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {fetchBasket} from "./http/cartApi";

function App() {

    const {userStore, basketStore, optionsStore} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const init = async () => {
        // const url = window.location.pathname
        // if (performance.navigation.type === 1) {
        //     optionsStore.setPath(url)
        // }
        if (localStorage.getItem('token')) {
            const userData = await check()
            userStore.setUser(userData)
            userStore.setIsAuth(true)
            const basket = await fetchBasket(userStore.user._id)
            basketStore.setBasketId(basket._id)
            basketStore.setProducts(basket.products)
        }
    }

    useEffect(() => {
        init().finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner
            className={"d-flex justify-content-center align-content-center"}
            style={{width: "30rem", height: "30rem"}}
            animation={"border"}
        />
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
