import React from 'react';
import ProductList from "./main/ProductList";
import {useParams} from "react-router-dom";
import {Container} from "react-bootstrap";

const SimilarProductsPage = () => {
    // const {id} = useParams()
    return (
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            Similar products functionality are currently unavailable
        </Container>
    )
}


export default SimilarProductsPage;