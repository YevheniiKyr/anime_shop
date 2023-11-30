import React, {useEffect, useState} from 'react';
import Rating from 'react-rating';
import {FaStar} from "react-icons/fa";
const RatingAlt = ({rating, color, readOnly, onRate, size}) => {

    useEffect(() => {
        console.log("SO " + readOnly)
    })
    return (
        <Rating
            style={{ fontSize: size? size :'24px', cursor: 'pointer' }}
            initialRating={rating}
            emptySymbol={<FaStar color = {'#e4e5e9'}/>}
            fullSymbol={<FaStar color = {'#ffc107'}/>}
            readonly={readOnly}
            fractions={10}
            onClick={(value) => {
                onRate(value)
                console.log('Click ' + value)
            }}
            onChange={(value) => {
                onRate(value)
                console.log('Change ' + value)

            }}

        />
    );
};

export default RatingAlt;