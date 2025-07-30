import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {fetchProductsFromBasket} from "../http/cartApi";
import ProductItemInBasket from "../components/productItemInBasket";
import {ORDER_ROUTE} from "../utils/constRoutes";

const BasketPage = observer(() => {

    const {basketStore, userStore} = useContext(Context)
    const navigate = useNavigate()
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //         fetchBasket(userStore.user._id).then(data => {
    //             basketStore.setProducts(data)
    //             console.log(basketStore.products)
    //         }).finally(() => setLoading(false))
    //     }, [])

    // if (loading) {
    //     return <Container> loading ...</Container>
    // }

    return (
            <Container>
                {
                    basketStore.products?.length ?
                        (
                            <Container>
                                <Row className="d-flex m-auto">
                                    {
                                        basketStore.products.map(
                                            p => <ProductItemInBasket key={p.product._id} product={p.product}
                                                                         amount={p.amount}
                                            />)

                                    }
                                </Row>
                                <Container className={"d-flex justify-content-center mt-5 "}
                                >
                                    <Button
                                        size={"lg"}
                                        onClick={() => navigate(ORDER_ROUTE + '/' + basketStore.basketId)}
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