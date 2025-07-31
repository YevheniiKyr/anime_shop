import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../../utils/constRoutes";
import {useNavigate} from "react-router-dom";
import {setProductsToBasket} from "../../http/basketApi";
import {Context} from "../../index";

import {observer} from "mobx-react-lite";
import CircleNumber from "../../components/CircleNumber";
import ChangeAmountModal from "../../components/modals/ChangeAmountModal";
import {MdEdit} from "react-icons/md";
import CloudinaryImage from "../../components/CloudinaryImage";
import {getProductsAfterDeletionFromCart} from "../../services/basketService";

const ProductItemInBasket = observer(({product, amount}) => {

        const navigate = useNavigate()
        const {basketStore, userStore} = useContext(Context)

        const deleteProductFromCart = async (productId) => {
            const products = getProductsAfterDeletionFromCart(productId, basketStore)
            const basket = await setProductsToBasket(userStore.user._id, products);
            basketStore.setProducts(basket.products);
            console.log("deleted")
        }


        const [isHovered, setIsHovered] = useState(false);
        const [amnt, setAmnt] = useState(amount)
        const [changeAmountVisible, setChangeAmountVisible] = useState(false);

        const updateAmnt = (newAmnt) => {
            setAmnt(newAmnt);
        }

        return (
            <Col md={4} lg={3} sm={6}>
                <Container>
                    <Card
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            width: '14rem',
                            cursor: "pointer",
                            marginTop: "3rem",
                            border: 'none',
                            boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
                        }}>
                        <CloudinaryImage
                            publicId={product.img}
                            width={300}
                            height={300}
                            alt={`Image of ${product.title}`}
                            styles={{width: '12rem', height: '10rem', alignSelf: "center", marginTop: "1rem"}}
                        />
                        <Card.Body>
                            <Card.Title
                                className={"d-flex justify-content-center"}
                                style={{fontSize: '2rem'}}
                            >
                                {product.title}
                            </Card.Title>
                            <Card.Text
                                className={"d-flex justify-content-center"}
                                style={{fontSize: '0.85rem'}}
                            >
                                {product.description.substring(0,35)} ...
                            </Card.Text>
                            <CircleNumber number={amnt}/>
                            <Button size={"sm"}
                                    className={'mb-1'}
                                    onClick={() => setChangeAmountVisible(true)}>
                                <MdEdit/>
                            </Button>


                            <Row className={"justify-content-between"}>
                                <Button
                                    className={"d-flex m-auto btn-info"}
                                    style={{
                                        width: '6rem',
                                        height: '2rem',
                                        fontSize: '1rem',
                                        justifyContent: "center",
                                        verticalAlign: "center"
                                    }}
                                    onClick={() => navigate(PRODUCT_ROUTE + '/' + product._id)}
                                >
                                    detail
                                </Button>
                                <Button
                                    className={"d-flex m-auto btn-danger"}
                                    style={{
                                        border: "none",
                                        width: '6rem',
                                        height: '2rem',
                                        fontSize: '1rem',
                                        textAlign: "center",
                                        justifyContent: "center",
                                        verticalAlign: "center"
                                    }}
                                    onClick={() => deleteProductFromCart(product._id)}
                                >
                                    delete
                                </Button>
                            </Row>
                        </Card.Body>
                    </Card>
                    <ChangeAmountModal
                        amount={amount}
                        setAmount={updateAmnt}
                        product={product}
                        show={changeAmountVisible}
                        onHide={() => setChangeAmountVisible(false)}
                    />
                </Container>
            </Col>
        );
    }
)

export default ProductItemInBasket;