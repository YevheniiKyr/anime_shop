import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Table} from "react-bootstrap";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import {Context} from "../index";
import {createOrder} from "../http/orderApi";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/constRoutes";
import {clearBasket} from "../http/cartApi";


const OrderPage = () => {

    const {basket, user} = useContext(Context)
    const KEY = process.env.REACT_APP_STRIPE
    const [total, setTotal] = useState(0)
    const [stripeToken, setStripeToken] = useState('')
    const navigate = useNavigate()

    const Mytd = styled.td`
        vertical-align: middle;
        text-align: center;
        font-size: 18px;
    `
    const Myth = styled.th`
        vertical-align: middle;
        text-align: center;
        font-size: 24px;
    `

    useEffect(() => {
        let sum = 0
        basket.products.map(prod => sum += prod.product.price * prod.amount)
        setTotal(sum)
    })

    const onToken = (token) => {
        setStripeToken(token)
    };

    const onOrderApprove = (billingAddress) => {
        createOrder({
            user: user.user._id,
            products: basket.products,
            address: billingAddress,
            status: "pending",
            total: total
        }).then(() => {
            clearBasket(basket.basket._id).then(() => {
                navigate(SHOP_ROUTE)
            })
        })
    }

    return (
        <Container>
            <h2 style={{textAlign: "center", marginTop: 30}}>YOUR ORDER</h2>
            <Table striped bordered hover size="sm" className={"mt-5"}>
                <thead>
                <tr>
                    <Myth></Myth>
                    <Myth style={{width: "10rem", height: "5rem"}}>Image</Myth>
                    <Myth>Name</Myth>
                    <Myth>Amount</Myth>
                    <Myth>Price</Myth>
                    <Myth>Description</Myth>
                </tr>
                </thead>
                <tbody>
                {
                    basket.products.map(
                        (prod, idx) =>
                            <tr key={prod.product._id}>
                                <Mytd> {idx + 1}</Mytd>
                                <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>
                                    <img
                                        src={process.env.REACT_APP_API_URL + prod.product.img} alt={"mini-image"}
                                        style={{width: "100%", height: "100%"}}
                                    />
                                </Mytd>
                                <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>{prod.product.title}</Mytd>
                                <Mytd> {prod.amount} </Mytd>
                                <Mytd
                                    style={{
                                        verticalAlign: "middle",
                                        textAlign: "center"
                                    }}
                                >
                                    {prod.product.price * prod.amount}
                                </Mytd>
                                <Mytd
                                    style={{
                                        verticalAlign: "middle",
                                        textAlign: "center"
                                    }}
                                >
                                    {prod.product.description}
                                </Mytd>
                            </tr>
                    )
                }
                </tbody>
            </Table>
            <Card>
                <Card.Text className={'ms-2'} style={{fontSize: '2rem'}}>
                    Total : {total}
                </Card.Text>
            </Card>
            <StripeCheckout
                name="Best Shop"
                image={require("../static/himars.jpg")}
                billingAddress
                shippingAddress
                description={`Your total is ${total}`}
                amount={total * 100}
                stripeKey={KEY}
                token={onToken}
            >
                <Button
                    style={{
                        display: "block", float: "left", marginTop: 10, fontSize: 24,
                        background: "#F59B56", border: "none"
                    }}
                    size={"lg"} onClick={() => onOrderApprove({street: "Shevchenka", house_num: 40})}
                >
                    Підтвердити замовлення
                </Button>
            </StripeCheckout>
        </Container>
    );


};

export default OrderPage;