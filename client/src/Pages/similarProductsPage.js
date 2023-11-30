import React, {useEffect} from 'react';
import ProductList from "../Components/ProductList";
import {useNavigate, useParams} from "react-router-dom";

const SimilarProductsPage = () => {
    const {id} = useParams()
    useEffect(()=> console.log("ID" + id))
    return (
        <ProductList recommendations={true} prod_id={id}/>

    );
};

export default SimilarProductsPage;