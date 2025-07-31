import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ORDER_ROUTE, SIMILAR_PRODUCTS_ROUTE} from "../../utils/constRoutes";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneProduct} from "../../http/productApi";
import {addReviewToProduct} from "../../http/reviewApi";

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ReviewList from "./ReviewList";
import AuthorizeFirstModal from "../../components/modals/AuthorizeFirstModal";
import RatingAlt from "../../components/RatingAlt";
import AddToCartModal from "../../components/modals/AddToCartModal";
import CloudinaryImage from "../../components/CloudinaryImage";
import Loader from "../../components/Loader";

const Index = observer(() => {

        const {id} = useParams()
        const navigate = useNavigate()
        const {userStore, reviewStore, productStore} = useContext(Context)
        const [authorizeVisible, setAuthorizeVisible] = useState(false)
        const [loading, setLoading] = useState(true)
        const [cartVisible, setCartVisible] = useState(false)
        const [comment, setComment] = useState('')
        const [rating, setRating] = useState(0);

        useEffect(() => {
            fetchOneProduct(id).then(data => {
                productStore.setCurrentProduct(data)
            }).finally(() => setLoading(false))
        }, [])

        const findSimilar = () => {
            navigate(SIMILAR_PRODUCTS_ROUTE + '/' + id)
        }

        const addReview = () => {
            const review = {rating: rating, text: comment}
            addReviewToProduct(id, review).then(data => {
                let newReviews = [...reviewStore.reviews]
                newReviews.push(data)
                reviewStore.setReviews(newReviews)
                setComment('')
                setRating(0)
                fetchOneProduct(id).then(data => {
                    productStore.setCurrentProduct(data)
                })
            })
            setRating(0)
        }
        if (loading) {
            return <Loader/>
        }
        return (
            <Container>
                <Container className={"d-flex justify-content-center"}>
                    <Card
                        style={{
                            width: '40vw',
                            border: 'none',
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            marginTop: "20px"
                        }}>
                        <CloudinaryImage
                            publicId={productStore.currentProduct.img}
                            width={300}
                            height={300}
                            alt={`Image of ${productStore.currentProduct.title}`}
                            styles={{width: '20vw', height: '20vw', alignSelf: "center", marginTop: "5vw"}}
                        />
                        <Card.Body>
                            <Card.Title
                                className={"d-flex justify-content-center"}
                                style={{fontSize: "4vw"}}
                            >
                                {productStore.currentProduct.title}
                            </Card.Title>
                            <Card.Text
                                className={"d-flex justify-content-center"}
                                style={{fontSize: "1.5vw"}}
                            >
                                {productStore.currentProduct.description}
                            </Card.Text>
                            <Container className={"d-flex justify-content-center"}>
                                <RatingAlt
                                    rating={productStore.currentProduct.rating}
                                    size="2.5vw"
                                    readOnly={true}/>
                            </Container>
                            <Form className={"d-flex justify-content-center "}>
                                <Button
                                    style={{
                                        height: "4vw",
                                        fontSize: "1.5vw"
                                    }}
                                    className={"mt-3 me-5 btn-info"}
                                    onClick={() => userStore.isAuth ? setCartVisible(true) : setAuthorizeVisible(true)}
                                >
                                    Add to cart
                                </Button>
                                <Button
                                    style={{
                                        height: "4vw",
                                        fontSize: "1.5vw"
                                    }}
                                    className={"mt-3 btn-success"}
                                    onClick={() => userStore.isAuth ? navigate(ORDER_ROUTE) : setAuthorizeVisible(true)}
                                >
                                    Buy
                                </Button>
                            </Form>
                        </Card.Body>
                        <AddToCartModal
                            product={productStore.currentProduct}
                            onHide={() => setCartVisible(false)}
                            show={cartVisible}/>
                    </Card>
                    <AuthorizeFirstModal show={authorizeVisible} onHide={() => setAuthorizeVisible(false)}/>
                </Container>
                <Button onClick={() => findSimilar(id)}> Similar </Button>
                <Container className={"justify-content-center"}>
                    <ReviewList productId = {id}/>
                    <Row className={"mt-4 ms-3"}>
                        <Col md={9} lg={9} sm={9} xs={9}>
                            <Form.Control
                                style={{resize: "none"}}
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                className={"mt-3"}
                                placeholder="Напишіть коментар"
                            />
                        </Col>
                        <Col className={"justify-content-start"} md={3} lg={3} sm={3} xs={3}>
                            <Button
                                size="md"
                                className={"mt-5 btn-success "}
                                onClick={() => userStore.isAuth ? addReview() : setAuthorizeVisible(true)}
                            >
                                Надіслати
                            </Button>
                        </Col>
                        <Container className={"d-flex justify-content-center"}>
                            <RatingAlt
                                rating={rating} size={35}
                                readOnly={false}
                                onRate={setRating}>
                            </RatingAlt>
                        </Container>
                    </Row>
                </Container>
            </Container>
        );
    }
)

export default Index;