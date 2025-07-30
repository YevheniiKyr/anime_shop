import React from 'react';
import ProductList from "../components/ProductList";
import {useParams} from "react-router-dom";

const SimilarProductsPage = () => {
    const {id} = useParams()
    return (
        <ProductList recommendations={true} prod_id={id}/>
    );
};

export default SimilarProductsPage;