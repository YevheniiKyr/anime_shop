import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {addProductToCart} from "../../http/cartApi";
import {BASKET_ROUTE} from "../../utils/constRoutes";
import {Button, Card, Container, Modal} from "react-bootstrap";
import AmountController from "../AmountController";

const ChangeAmountModal = observer(({product, show, onHide, amount, setAmount}) => {

    const {basket} = useContext(Context)
    const [amnt, setAmnt] = useState(amount)
    const navigate = useNavigate()

    const addToCart = () => {
        addProductToCart(basket.basket._id, product._id, amnt - amount).then(data => {
                console.log(data)
                navigate(BASKET_ROUTE + '/' + basket.basket._id)
            }
        )
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
                    <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img}
                              style={{width: '12rem', height: '10rem', alignSelf: "center", marginTop: "1rem"}}/>
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