import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Table} from "react-bootstrap";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import {Context} from "../../index";
import {createOrder} from "../../http/orderApi";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/constRoutes";
import {clearBasket} from "../../http/basketApi";
import OrderTableRow from "./OrderTableRow";

const MyTh = styled.th`
    vertical-align: middle;
    text-align: center;
    font-size: 24px;
`

const Index = () => {

    const {basketStore, userStore} = useContext(Context)
    const KEY = process.env.REACT_APP_STRIPE
    const [total, setTotal] = useState(0)
    const [stripeToken, setStripeToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        let sum = 0
        basketStore.products.map(prod => sum += prod.product.price * prod.amount)
        setTotal(sum)
    })

    const onToken = (token) => {
        setStripeToken(token)
    };

    const onOrderApprove = async (billingAddress) => {
        await createOrder({
            user: userStore.user._id,
            products: basketStore.products,
            address: billingAddress,
            total: total
        })
        await clearBasket(basketStore.basketId)
        navigate(SHOP_ROUTE)
    }

    return (
        <Container>
            <h2 style={{textAlign: "center", marginTop: 30}}>YOUR ORDER</h2>
            <Table striped bordered hover size="sm" className={"mt-5"}>
                <thead>
                <tr>
                    <MyTh></MyTh>
                    <MyTh style={{width: "10rem", height: "5rem"}}>Image</MyTh>
                    <MyTh>Name</MyTh>
                    <MyTh>Amount</MyTh>
                    <MyTh>Price</MyTh>
                    <MyTh>Description</MyTh>
                </tr>
                </thead>
                <tbody>
                {
                    basketStore.products.map(
                        (productWithAmount, idx) =>
                            <OrderTableRow
                                key={productWithAmount.product._id}
                                productWithAmount={productWithAmount}
                                idx={idx}
                            />
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
                image={require("../../static/himars.jpg")}
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
                    size={"lg"}
                    onClick={() => onOrderApprove({street: "Shevchenka", house_num: 40})}
                >
                    Підтвердити замовлення
                </Button>
            </StripeCheckout>
        </Container>
    );

};

export default Index;