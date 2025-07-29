import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constRoutes";
import {login, registration} from "../http/authApi";
import {fetchBasket} from "../http/cartApi";

const Auth = observer(() => {

    const navigate = useNavigate()
    const location = useLocation()
    const isRegistration = location.pathname === REGISTRATION_ROUTE
    const {user, basket} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async () => {
        try {
            const response = await registration(email, password)
            user.setUser(response)
            user.setIsAuth(true)
            fetchBasket(response._id)
                .then(data => {
                    basket.setBasket(data)
                    basket.setProducts(data.products)
                })
                .then(() => navigate(SHOP_ROUTE))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const signIn = async () => {
        try {
            const user_data = await login(email, password);
            user.setUser(user_data)
            user.setIsAuth(true)
        } catch (e) {
            alert("Wrong email or password")
        }
        try {
            const data = await fetchBasket(user.user._id);
            basket.setBasket(data)
            basket.setProducts(data.products)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert("Basket functionality is not working currently")
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 60}}
        >
            <Card
                style={{width: 600, border: 'none', boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}}
                className="p-5"
            >
                <h2 className="m-auto">{isRegistration ? "Реєстрація" : 'Авторизація'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {
                            isRegistration ?
                                <div>
                                    <Link to={LOGIN_ROUTE}>Увійти</Link>
                                </div>
                                :
                                <div>
                                    <Link to={REGISTRATION_ROUTE}>Зареєструватися</Link>
                                </div>
                        }
                        <Button
                            className={"mt-2 btn-success"}
                            onClick={isRegistration ? signUp : signIn}
                        >
                            {isRegistration ? "Реєстрація" : 'Авторизація'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})


export default Auth;