import React, {useContext, useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../index";
import ProductItem from "./ProductItem";
import {observer} from "mobx-react-lite";
import {fetchRecommendations, findSimilarByAll, findSimilarByDesc} from "../http/recApi";



const ProductList = observer(({recommendations, prod_id}) => {


        const {product, user} = useContext(Context)

        const [rec,setRec] = useState([])
        const [loading, setLoading] = useState(true)
        useEffect(()=>{
            console.log("PROD_ID " + prod_id)
            if(recommendations){
                if(prod_id){
                    console.log("PROD_ID HERE")
                    findSimilarByAll(user.user._id, prod_id).then(data =>
                        setRec(data)
                    )
                }
                else {

                    fetchRecommendations(user.user._id).then(data => {
                        setRec(data)

                    })
                }
                setLoading(false)

            }

        }, [])




        return (
            recommendations?
                <Row className="d-flex m-auto ">

                    {

                        rec.map(

                            prod => <ProductItem  key={prod._id} product = {prod} />

                        )

                    }
                </Row>
                :
            <Row className="d-flex m-auto ">
                {

                    product.products.map(

                    prod => <ProductItem  key={prod._id} product = {prod} />

                    )
                }
            </Row>
        );
    }
)

export default ProductList;