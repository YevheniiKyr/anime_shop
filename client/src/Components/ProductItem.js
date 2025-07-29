import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/constRoutes";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import AddToCartModal from "./modals/AddToCartModal";
import AuthorizeFirstModal from "./modals/AuthorizeFirstModal";
import RatingAlt from "./RatingAlt";
import CloudinaryImage from "./CloudinaryImage";

const ProductItem = observer(({product}) => {

    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);
    const {user} = useContext(Context)
    const [cartVisible, setCartVisible] = useState(false)
    const [authorizeVisible, setAuthorizeVisible] = useState(false)
    const {product: products} = useContext(Context)

    useEffect(() => {
        console.log(product.rating)
    }, []);
    return (
        <Col lg={3} md={4} sm={6} xs={12}>
            {<Container className={products.limit === 2 && "d-flex m-auto justify-content-center"}>
                <Card
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(event) => {
                        if (event.target.tagName !== 'BUTTON') {
                            console.log("NOT A BUTTON")
                            products.setCurrentProduct(product)
                            navigate(PRODUCT_ROUTE + '/' + product._id)
                        }
                    }}
                    style={{
                        width: '14rem',
                        cursor: "pointer",
                        marginTop: "3rem",
                        border: 'none',
                        boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)  ' : 'none',
                        transform: isHovered ? 'scale(1.2)' : 'none',
                        transition: isHovered ? 'all 0.3s ease-in-out' : 'none',
                        zIndex: isHovered ? 1 : 0
                    }}>
                    <CloudinaryImage
                        publicId={product.img}
                        width={300}
                        height={300}
                        alt={`Image of ${product.name}`}
                        style={{width: '10rem', height: '12rem', alignSelf: "center", marginTop: "1rem"}}
                    />
                    <Card.Body>
                        <Card.Title
                            className={"d-flex justify-content-center"}
                            style={{fontSize: '1.5rem'}}
                        >
                            {product.title}
                        </Card.Title>
                        <Card.Text
                            className={"d-flex justify-content-center"}
                            style={{fontSize: '0.85rem'}}
                        >
                            {product.description.substring(0, 40)} ...
                        </Card.Text>
                        <Card.Text
                            className={"d-flex justify-content-center"}
                            style={{fontSize: '1.2rem'}}
                        >
                            {product.price}$
                        </Card.Text>
                        <Container className={"d-flex justify-content-center mb-3"}>
                            <RatingAlt
                                rating={product.rating}
                                readOnly={true}
                            />
                        </Container>
                        <Button
                            className={"d-flex m-auto btn-success"}
                            onClick={() => user.isAuth ? setCartVisible(true) : setAuthorizeVisible(true)}
                        >
                            to cart
                        </Button>
                    </Card.Body>
                </Card>
                <AddToCartModal
                    product={product}
                    onHide={() => setCartVisible(false)}
                    show={cartVisible}
                />
                <AuthorizeFirstModal
                    onHide={() => setAuthorizeVisible(false)}
                    show={authorizeVisible}
                />
            </Container>
            }
        </Col>
    );
})

export default ProductItem;