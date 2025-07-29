import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {addProductToCart} from "../../http/cartApi";
import {BASKET_ROUTE} from "../../utils/constRoutes";
import {Button, Card, Container, Modal} from "react-bootstrap";
import AmountController from "../AmountController";
import CloudinaryImage from "../CloudinaryImage";

const ChangeAmountModal = observer(({product, show, onHide, amount, setAmount}) => {

    const {basket, user} = useContext(Context)
    const [amnt, setAmnt] = useState(amount)
    const navigate = useNavigate()

    const addToCart = async () => {
        const newItem = {product: product._id, amount:  amnt - amount }
        const products =  [...basket.products, newItem]
        await addProductToCart(user.user._id, products)
        basket.setProducts(products);
        navigate(BASKET_ROUTE + '/' + basket.basket._id)
        setAmount(amnt)
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >

            <Modal.Body style={{textAlign: 'center'}}>
                <Card>
                    <CloudinaryImage
                        publicId={product.img}
                        width={300}
                        height={300}
                        alt={`Image of ${product.name}`}
                        style={{width: '12rem', height: '10rem', alignSelf: "center", marginTop: "1rem"}}
                    />
                    <Card.Body>
                        <Card.Text>
                            {product.name}
                        </Card.Text>
                        <AmountController amount={amnt} setAmount={setAmnt}/>
                    </Card.Body>

                </Card>

            </Modal.Body>
            <Modal.Footer>
                <Container className={'d-flex justify-content-center'}>
                    <Button style={{marginRight: '3rem'}} variant="outline-danger" onClick={onHide}>Закрити</Button>
                    <Button variant="outline-success" onClick={addToCart}>Зберегти</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
})

export default ChangeAmountModal;