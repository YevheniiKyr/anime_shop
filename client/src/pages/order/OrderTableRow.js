import React from 'react';
import styled from "styled-components";
import CloudinaryImage from "../../components/CloudinaryImage";

const MyTd = styled.td`
        vertical-align: middle;
        text-align: center;
        font-size: 18px;
    `

const OrderTableRow = ({productWithAmount, idx}) => {

    return (
        <tr key={productWithAmount.product._id}>
            <MyTd> {idx + 1}</MyTd>
            <MyTd style={{verticalAlign: "middle", textAlign: "center"}}>
                <CloudinaryImage
                    publicId={productWithAmount.product.img}
                    alt={`Image of ${productWithAmount.product.title}`}
                    styles={{width: "50%", height: "auto"}}
                />
            </MyTd>
            <MyTd style={{verticalAlign: "middle", textAlign: "center"}}>{productWithAmount.product.title}</MyTd>
            <MyTd> {productWithAmount.amount} </MyTd>
            <MyTd
                style={{
                    verticalAlign: "middle",
                    textAlign: "center"
                }}
            >
                {productWithAmount.product.price * productWithAmount.amount}
            </MyTd>
            <MyTd
                style={{
                    verticalAlign: "middle",
                    textAlign: "center"
                }}
            >
                {productWithAmount.product.description}
            </MyTd>
        </tr>
    );
};

export default OrderTableRow;