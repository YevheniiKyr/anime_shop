import React, {useContext, useState} from 'react';
import {Container, Dropdown, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const PriceDropdown = observer(() => {

    const {product} = useContext(Context)
    const [clicked, setClicked] = useState(false)
    const filterByPrice = (price) => {
        product.setCurrentPrice(price)

    }

    const chooseItem = (price) => {
        if (clicked && price.min === product.currentPrice?.min) {
            setClicked(false)
            filterByPrice(null)
        } else {
            setClicked(true)
            filterByPrice(price)
        }
    }
    return (
        <Container>
            <Row className="mt-5">
                <Dropdown>
                    <Dropdown.Toggle style={{background: 'none', border: 'none', color: 'grey'}} id="dropdown-basic">
                        {product.currentPrice ? `${product.currentPrice.min} - ${product.currentPrice.max}` : "Price"}
                    </Dropdown.Toggle>


                    <Dropdown.Menu>
                        {
                            product.prices.map(
                                price => <Dropdown.Item key={price.min}
                                                        onClick={() => chooseItem(price)}
                                                        style = {clicked && price.min === product.currentPrice?.min ? { backgroundColor: 'lightblue' } : {}}
                               >
                                    {`${price.min} - ${price.max}`}
                                </Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>
            </Row>
        </Container>


    )
})


export default PriceDropdown;