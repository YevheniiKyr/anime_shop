import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ReviewItem from "./ReviewItem";
import {fetchReviews} from "../../http/reviewApi";
import Loader from "../../components/Loader";

const ReviewList = observer(({productId}) => {

        let [loading, setLoading] = useState(true);
        const {reviewStore} = useContext(Context)

        useEffect(() => {
            fetchReviews(productId).then(data => {
                reviewStore.setReviews(data)
                setLoading(false);
            })
        }, [])

        if (loading) {
            return <Loader/>
        }
        return (
            <Container className={"mt-4"}>
                {
                    reviewStore.reviews.length === 0 ? (
                        <div>No reviews found.</div>
                    ) : (
                        <Row className="d-flex m-auto">
                            {reviewStore.reviews.map((review) => <ReviewItem key={review._id} review={review}/>)}
                        </Row>
                    )}
            </Container>
        );
    }
)

export default ReviewList;