import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import NavBar from "./Components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/authApi";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {fetchBasket} from "./http/cartApi";

function App() {

    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const {optionsStore} = useContext(Context)

    useEffect(() => {
        const url = window.location.pathname

        if (performance.navigation.type === 1) {
            optionsStore.setPath(url)
        }

        if (localStorage.getItem('token')) {
            check()
                .then(user_data => {
                    user.setUser(user_data)
                    user.setIsAuth(true)
                    fetchBasket(user.user._id).then(data => {
                        basket.setBasket(data)
                    })
                })
                .finally(() => setLoading(false))
        }
        setLoading(false)
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
