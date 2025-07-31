import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Container, Modal} from "react-bootstrap";
import {setProductsToBasket} from "../../http/basketApi";
import AmountController from "../AmountController";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE} from "../../utils/constRoutes";
import CloudinaryImage from "../CloudinaryImage";
import {getProductsAfterAdditionToCart} from "../../services/basketService";


const AddToCartModal = observer(({product, show, onHide}) => {

    const {basketStore, userStore} = useContext(Context)
    const [amount, setAmount] = useState(1)
    const navigate = useNavigate()

    const addToCart = async () => {
        const newItem = {product: product._id, amount: amount}
        const products = getProductsAfterAdditionToCart(newItem, basketStore)
        const updatedBasket = await setProductsToBasket(userStore.user._id, products)
        basketStore.setProducts(updatedBasket.products)
        navigate(BASKET_ROUTE)
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
                        alt={`Image of ${product.title}`}
                        styles={{width: 'auto', height: '15rem', alignSelf: "center", marginTop: "1rem"}}
                    />

                    <Card.Body>
                        <Card.Text>
                            {product.title}
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