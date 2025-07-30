import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Container, Modal} from "react-bootstrap";
import {setProductsToCart} from "../../http/cartApi";
import AmountController from "../AmountController";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE} from "../../utils/constRoutes";
import CloudinaryImage from "../CloudinaryImage";
import {getProductsAfterAdditionToCart} from "../../services/cartService";


const AddToCartModal = observer(({product, show, onHide}) => {

    const {basketStore, userStore} = useContext(Context)
    const [amount, setAmount] = useState(1)
    const navigate = useNavigate()

    const addToCart = async () => {
        const newItem = {product: product._id, amount: amount}
        const products = getProductsAfterAdditionToCart(newItem, basketStore)
        const updatedProducts = await setProductsToCart(userStore.user._id, products)
        basketStore.setProducts(updatedProducts)
        navigate(BASKET_ROUTE + '/' + basketStore.basketId)
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