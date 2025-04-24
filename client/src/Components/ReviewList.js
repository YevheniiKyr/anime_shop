import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ReviewItem from "./ReviewItem";
import {fetchReviews} from "../http/productApi";

const ReviewList = observer(({product_id}) => {

        let [loading, setLoading] = useState(true);
        const {reviewsContext} = useContext(Context)

        useEffect(() => {
            fetchReviews(product_id).then(data => {
                reviewsContext.setReviews(data)
                setLoading(false);
            })
        }, [])

        return (
            <Container className={"mt-4"}>
                {
                    loading ? <div>Loading reviews...</div>
                        :
                        reviewsContext.reviews.length === 0 ? (
                            <div>No reviews found.</div>
                        ) : (
                            <Row className="d-flex m-auto">
                                {reviewsContext.reviews.map((review) => <ReviewItem key={review._id} review={review}/>)}
                            </Row>
                        )}
            </Container>
        );
    }
)

export default ReviewList;