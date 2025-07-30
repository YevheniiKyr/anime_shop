import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {setProductsToCart} from "../../http/cartApi";
import {BASKET_ROUTE} from "../../utils/constRoutes";
import {Button, Card, Container, Modal} from "react-bootstrap";
import AmountController from "../AmountController";
import CloudinaryImage from "../CloudinaryImage";
import {getProductsAfterAdditionToCart} from "../../services/cartService";

const ChangeAmountModal = observer(({product, show, onHide, amount, setAmount}) => {

    const {basketStore, userStore} = useContext(Context)
    const [amnt, setAmnt] = useState(amount)
    const navigate = useNavigate()

    const addToCart = async () => {
        const newItem = {product: product._id, amount:  amnt - amount }
        const products = getProductsAfterAdditionToCart(newItem, basketStore)
        await setProductsToCart(userStore.user._id, products)
        basketStore.setProducts(products);
        navigate(BASKET_ROUTE + '/' + basketStore.basketId)
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
                        styles={{width: '12rem', height: '10rem', alignSelf: "center", marginTop: "1rem"}}
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