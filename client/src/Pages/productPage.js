import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ORDER_ROUTE, SIMILAR_PRODUCTS_ROUTE} from "../utils/constRoutes";
import {useNavigate, useParams} from "react-router-dom";
import {addReviewToProduct, fetchOneProduct} from "../http/productApi";
import styled from "styled-components";
import {addProductToCart} from "../http/cartApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ReviewList from "../Components/ReviewList";
import AuthorizeFirstModal from "../Components/modals/AuthorizeFirstModal";
import RatingAlt from "../Components/RatingAlt";
import AddToCartModal from "../Components/modals/AddToCartModal";


const MyButton = styled.button`

  font-size: 18px;
`
const ProductPage = observer(() => {

        const {id} = useParams()
        const navigate = useNavigate()
        const {user, basket} = useContext(Context)
        const {reviewsContext, product: products} = useContext(Context)

        const [authorizeVisible, setAuthorizeVisible] = useState(false)
        const [loading, setLoading] = useState(true)

        const [cartVisible, setCartVisible] = useState(false)


        const findSimilar = () => {
            navigate(SIMILAR_PRODUCTS_ROUTE + '/' + id)
        }

        const addReview = () => {
            const review = {product: id, user: user.user._id, rating: rating, text: comment}

            addReviewToProduct(review).then(data => {
                let newReviews = [...reviewsContext.reviews]
                newReviews.push(data)
                reviewsContext.setReviews(newReviews)
                setComment('')
                setRating(0)
                fetchOneProduct(id).then(data => {
                        // setProduct(date)
                        products.setCurrentProduct(data)

                    }
                )

            })
            setRating(0)
        }

        const [comment, setComment] = useState('')


        useEffect(() => {
            fetchOneProduct(id).then(data => {
                products.setCurrentProduct(data)
                setLoading(false)
            })

        }, [])

        const [rating, setRating] = useState(products.currentProduct.averageRating);


        return (
            <Container>
                {
                    loading ?
                        <Container>LOADING</Container>
                        :
                        <Container>

                            <Container className={"d-flex justify-content-center"}>

                                <Card
                                    style={{
                                        width: '40vw',
                                        border: 'none',
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                        marginTop: "20px"
                                    }}>
                                    <Card.Img src={process.env.REACT_APP_API_URL + products.currentProduct.img}
                                              style={{
                                                  width: '20vw',
                                                  height: '20vw',
                                                  alignSelf: "center",
                                                  marginTop: "5vw",
                                              }}/>
                                    <Card.Body>
                                        <Card.Title className={"d-flex justify-content-center"}
                                                    style={{fontSize: "4vw"}}> {products.currentProduct.title}</Card.Title>
                                        <Card.Text className={"d-flex justify-content-center"} style={{fontSize: "1.5vw"}}>
                                            {products.currentProduct.description}
                                        </Card.Text>
                                        <Container className={"d-flex justify-content-center"}>
                                            <RatingAlt rating={products.currentProduct.averageRating}
                                                       size="2.5vw"
                                                       readOnly={true}></RatingAlt>
                                        </Container>
                                        <Form className={"d-flex justify-content-center "}>
                                            <Button  //style={{background: "none", border: 'none'}}
                                                style={{
                                                    height: "4vw",
                                                    fontSize: "1.5vw"
                                                }}

                                                className={"mt-3 me-5 btn-info"}
                                                onClick={() =>

                                                    user.isAuth ?
                                                        setCartVisible(true)
                                                        :
                                                        setAuthorizeVisible(true)

                                                }

                                            >
                                                Add to cart
                                            </Button>

                                            <Button
                                                style={{
                                                    height: "4vw",
                                                    fontSize: "1.5vw"
                                                }}

                                                className={"mt-3 btn-success"}
                                                onClick={
                                                    user.isAuth ?
                                                        () => {
                                                            console.log("AUTH")
                                                            navigate(ORDER_ROUTE + '/' + 2)
                                                        }
                                                        :
                                                        () => setAuthorizeVisible(true)

                                                }

                                            >
                                                Buy
                                            </Button>
                                        </Form>

                                    </Card.Body>
                                    <AddToCartModal product={products.currentProduct} onHide={() => setCartVisible(false)}
                                                    show={cartVisible}></AddToCartModal>
                                </Card>

                                <AuthorizeFirstModal show={authorizeVisible} onHide={() => setAuthorizeVisible(false)}/>

                            </Container>
                            <Button onClick={() => findSimilar(id)}> Similar </Button>
                            <Container className={"justify-content-center"}>
                                <ReviewList product_id={id}/>


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
                                        <Button size="md" className={"mt-5 btn-success "}
                                                onClick={
                                                    user.isAuth ?
                                                        () => addReview()
                                                        :
                                                        () => setAuthorizeVisible(true)}
                                        >Надіслати</Button>
                                    </Col>
                                    <Container className={"d-flex justify-content-center"}>
                                        <RatingAlt
                                            rating={rating} size={35} readOnly={false}
                                            onRate={setRating}> </RatingAlt>
                                    </Container>
                                </Row>

                            </Container>

                        </Container>
                }
            </Container>

        );

    }
)

export default ProductPage;