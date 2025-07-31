import React, {useContext} from 'react';
import {Button, Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    RECOMMENDATIONS_ROUTE,
    SHOP_ROUTE,
    USER_ROUTE
} from "../utils/constRoutes";
import {FcShop} from "react-icons/fc"
import {CiUser} from 'react-icons/ci'
import {FaRegHeart} from 'react-icons/fa'

const NavBar = observer(() => {
    const {userStore, basketStore, optionsStore} = useContext(Context)
    const navigate = useNavigate()


    const logout = () => {
        navigate(LOGIN_ROUTE)
        userStore.setUser({})
        userStore.setIsAuth(false)
        basketStore.setBasketId({})
        basketStore.setProducts({})
        optionsStore.setPath('')
        localStorage.removeItem('token');
    }

    return (

        <Navbar bg="light" variant="dark">
            <Container>
                <Button
                    onClick={() => navigate(SHOP_ROUTE)}
                    variant={"light"}>
                    <FcShop size={50}/>
                </Button>

                {userStore.isAuth?
                    (
                        <Nav className="ml-auto ">
                            <Button className={"me-2"}
                                    variant={"light"}
                                    style={{border: 'none', background: 'none', color: "black"}}
                                    onClick={() => navigate(RECOMMENDATIONS_ROUTE)}> <FaRegHeart size={35}/>
                            </Button>
                            <Button
                                size={"lg"}
                                variant={"light"}
                                style={{marginRight: 15, border: 'none'}}
                                onClick={() => navigate(BASKET_ROUTE)}
                            >
                                <img className={"d-flex m-auto"}
                                     src={`${require("../static/shopping_cart_1.png")}`} width={"35px"} alt={"basket"}/>
                            </Button>
                            <Button
                                size={"lg"}
                                variant={"light"}
                                style={{marginRight: 15, border: 'none'}}
                                onClick= {() => navigate(USER_ROUTE)}
                            >
                                <CiUser/>
                            </Button>
                            {
                                userStore.user.role === 'ADMIN' &&
                                    <Button
                                        size={"lg"}
                                        onClick={() => navigate(ADMIN_ROUTE)}
                                        style={{marginRight: 5}}
                                        variant={"light"}
                                    >
                                        адмін
                                    </Button>
                            }
                            <Button
                                size={"lg"}
                                onClick={logout}
                                variant={"light"}
                            >
                                <img className={"d-flex m-auto"}
                                     src={`${require("../static/logout-icon.png")}`} width={"35px"} alt={"basket"}/>
                            </Button>
                        </Nav>
                    )
                    :
                    <Nav className="ml-auto">
                        <Button
                            size={"lg"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                            variant={"light"}
                        >
                            <img
                                className={"d-flex m-auto"}
                                src={`${require("../static/log_in_2.png")}`}
                                width={"40px"}
                                alt={"basket"}
                            />
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;