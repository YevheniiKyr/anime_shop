import React from 'react';
import ProductList from "./main/ProductList";
import {Container} from "react-bootstrap";

const RecommendationsPage = () => {
    return (
        <Container className={"d-flex justify-content-center align-items-center mt-5"}> Recommendations are currently unavailable </Container>
     // <ProductList recommendations={true}/>
    );
};

export default RecommendationsPage;