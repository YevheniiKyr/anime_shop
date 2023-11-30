import React, {useEffect, useState} from 'react';
import {FaStar, FaStarHalf, FaStarHalfAlt} from 'react-icons/fa';
import {Container} from "react-bootstrap";

function Rating({rating, onRate, editable, product_id, size, reviews_length}) {

    const [hoverRating, setHoverRating] = useState(0);
    const [ratingEdit, setRatingEdit] = useState(rating);
    const [color, setColor] = useState("")

    const fullStars = Math.floor(rating)
    const partStar = rating - fullStars
    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (value) => {
        console.log("STARS " + value)
        onRate(value);
        setRatingEdit(value)

    };

    const stars = [1, 2, 3, 4, 5]



    return (
        editable ?
            (
                <Container className={"mb-1 mt-2 d-flex justify-content-center"}>
                    {
                        stars.map(star => {
                            return (
                                <span
                                    key={star}
                                    onMouseEnter={() => handleMouseEnter(star)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(star)}
                                >
                      <FaStar
                          color={(star <= ratingEdit) || star <= hoverRating ? '#ffc107' : '#e4e5e9'}
                          size={size || 25}
                          style={{marginRight: 10, cursor: 'pointer'}}
                      />
          </span>
                            )
                        })
                    }
                </Container>
            )
            :
            (
                stars.map((star, idx) => {
                        return (
                            idx === fullStars && partStar >= 0.5 ?
                                <FaStarHalfAlt
                                    color={'#ffc107'}
                                    size={size || 25}
                                    style={{marginRight: 10, cursor: 'pointer'}}

                                />
                                :
                                <FaStar
                                    color={(star <= (rating)) ? (color ? color : '#ffc107') : '#e4e5e9'}
                                    size={size || 25}
                                    style={{marginRight: 10, cursor: 'pointer'}}
                                />
                        )
                    }
                )))


}

export default Rating;
