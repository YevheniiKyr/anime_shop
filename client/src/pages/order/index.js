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
import shopLogo from "../../static/himars.jpg";

const MyTh = styled.th`
    vertical-align: middle;
    text-align: center;
    font-size: 24px;
`

const Index = () => {

    const {basketStore, userStore} = useContext(Context)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let sum = 0
        basketStore.products.map(prod => sum += prod.product.price * prod.amount)
        setTotal(sum)
    })

    const handleToken = async (token) => {
        const address =  token.card.address_country + ', ' + token.card.address_city + ', ' + token.card.address_line1
        console.log("add", address)
        console.log("token", token)
        await createOrder({
            user: userStore.user._id,
            products: basketStore.products,
            address: address,
            total: total
        })
        await clearBasket(basketStore.basketId)
        basketStore.setProducts([])
        navigate(SHOP_ROUTE)
    };


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
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
                token={handleToken}
                billingAddress
                shippingAddress
                amount={total * 100}
                name="Anime shop"
                image={shopLogo + ''}
            >
                <Button
                    style={{
                        display: "block", float: "left", marginTop: 10, fontSize: 24,
                        background: "#F59B56", border: "none"
                    }}
                    size={"lg"}
                >
                    Підтвердити замовлення
                </Button>
            </StripeCheckout>
        </Container>
    );

};

export default Index;