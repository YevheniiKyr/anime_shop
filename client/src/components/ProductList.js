import React, {useContext, useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../index";
import ProductItem from "./ProductItem";
import {observer} from "mobx-react-lite";
import {fetchRecommendations, findSimilarByAll} from "../http/recApi";

const ProductList = observer(({recommendations, prod_id}) => {

        const {productStore, userStore} = useContext(Context)
        const [rec, setRec] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            if (recommendations) {
                if (prod_id) findSimilarByAll(userStore.user._id, prod_id).then(data => setRec(data))
                else fetchRecommendations(userStore.user._id).then(data => setRec(data))
            }
            setLoading(false)
        }, [])


        return (
            recommendations ?
                <Row className="d-flex m-auto ">
                    {rec.map(prod => <ProductItem key={prod._id} product={prod}/>)}
                </Row>
                :
                <Row className="d-flex m-auto ">
                    {productStore.products.map(prod => <ProductItem key={prod._id} product={prod}/>)}
                </Row>
        );
    }
)

export default ProductList;