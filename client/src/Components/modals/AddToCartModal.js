import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Container, Form, Modal} from "react-bootstrap";
import {addProductToCart} from "../../http/cartApi";
import AmountController from "../AmountController";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE, PRODUCT_ROUTE} from "../../utils/constRoutes";
import CloudinaryImage from "../CloudinaryImage";


const AddToCartModal = observer(({product, show, onHide}) => {

    const {basket, user} = useContext(Context)
    const [amount, setAmount] = useState(1)
    const navigate = useNavigate()

    const addToCart = async () => {
        const newItem = {product: product._id, amount: amount }
        const products =  [...basket.products, newItem]
        await addProductToCart(user.user._id, products)
        basket.setProducts(products);
        navigate(BASKET_ROUTE + '/' + basket.basket._id)
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
                        alt={`Image of ${product.name}`}
                        style={{width: '12rem', height: '10rem', alignSelf: "center", marginTop: "1rem"}}
                    />
                    <Card.Body>
                        <Card.Text>
                            {product.name}
                        </Card.Text>
                        <AmountController setAmount={setAmount}/>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Container className={'d-flex justify-content-center'}>
                    <Button style={{marginRight: '3rem'}} variant="outline-danger" onClick={onHide}>Закрити</Button>
                    <Button variant="outline-success" onClick={addToCart}>Додати</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
})

export default AddToCartModal;