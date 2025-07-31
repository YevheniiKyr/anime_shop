import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import ProductItemInBasket from "./productItemInBasket";
import {ORDER_ROUTE} from "../../utils/constRoutes";

const Index = observer(() => {

    const {basketStore} = useContext(Context)
    const navigate = useNavigate()

    return (
            <Container>
                {
                    basketStore.products?.length ?
                        (
                            <Container>
                                <Row className="d-flex m-auto">
                                    {
                                        basketStore.products.map(
                                            p => <ProductItemInBasket
                                                    key={p.product._id}
                                                    product={p.product}
                                                    amount={p.amount}
                                                />
                                        )

                                    }
                                </Row>
                                <Container className={"d-flex justify-content-center mt-5 "}
                                >
                                    <Button
                                        size={"lg"}
                                        onClick={() => navigate(ORDER_ROUTE)}
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
                            src={`${require("../../static/cart_rofl.webp")}`}
                            width={"500rem"}
                            alt={"basket"}
                        />
                }
            </Container>
    );

})

export default Index;