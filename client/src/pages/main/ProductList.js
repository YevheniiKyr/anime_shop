import React, {useContext, useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../../index";
import ProductItem from "./ProductItem";
import {observer} from "mobx-react-lite";
import {fetchRecommendations, findSimilarByAll} from "../../http/recommendApi";
import Loader from "../../components/Loader";

const ProductList = observer(({recommendations, productId}) => {

        const {productStore, userStore} = useContext(Context)
        const [rec, setRec] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            if (recommendations) {
                if (productId) findSimilarByAll(userStore.user._id, productId).then(data => setRec(data)).finally(() => setLoading(false))
                else fetchRecommendations(userStore.user._id).then(data => setRec(data)).finally(() => setLoading(false))
            }
            setLoading(false)
        }, [])

        if(loading) return <Loader/>
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