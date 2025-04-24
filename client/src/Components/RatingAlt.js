import React from 'react';
import Rating from 'react-rating';
import {FaStar} from "react-icons/fa";

const RatingAlt = ({rating, color, readOnly, onRate, size}) => {

    return (
        <Rating
            style={{ fontSize: size? size :'24px', cursor: 'pointer' }}
            initialRating={rating}
            emptySymbol={<FaStar color = {'#e4e5e9'}/>}
            fullSymbol={<FaStar color = {'#ffc107'}/>}
            readonly={readOnly}
            fractions={10}
            onClick={(value) => onRate(value)}
            onChange={(value) => onRate(value)}
        />
    );
};

export default RatingAlt;