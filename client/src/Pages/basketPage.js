import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchProductsFromBasket} from "../http/cartApi";
import ProductItemInBasket from "../Components/productItemInBasket";
import {ORDER_ROUTE} from "../utils/constRoutes";

const BasketPage = observer(() => {

    const {basket, user} = useContext(Context)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            fetchProductsFromBasket(user.user._id).then(data => {
                basket.setProducts(data)
                console.log(basket.products.products.length)
                console.log(data)
            }).finally(() => setLoading(false))
        }, [])

    if (loading) {
        return <Container> loading ...</Container>
    }

    return (
            <Container>
                {
                    basket.products.products.length ?
                        (
                            <Container>
                                <Row className="d-flex m-auto">
                                    {
                                        basket.products.products.map(
                                            prod => <ProductItemInBasket key={prod.product} product={prod.product}
                                                                         amount={prod.amount}
                                            />)

                                    }
                                </Row>
                                <Container className={"d-flex justify-content-center mt-5 "}
                                >
                                    <Button
                                        size={"lg"}
                                        onClick={() => navigate(ORDER_ROUTE + '/' + basket.basket._id)}
                                        style={{margin: 5, background: "#F59B56", border: "none"}}

                                    >
                                        Переглянути замовлення
                                    </Button>
                                </Container>
                            </Container>
                        )
                        :
                        <img
                            className={"d-flex m-auto"}
                            src={`${require("../static/cart_rofl.webp")}`}
                            width={"500rem"}
                            alt={"basket"}
                        />
                }
            </Container>
    );

})

export default BasketPage;