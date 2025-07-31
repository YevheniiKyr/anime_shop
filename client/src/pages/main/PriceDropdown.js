import React, {useContext, useState} from 'react';
import {Container, Dropdown, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const PriceDropdown = observer(() => {

    const {productStore} = useContext(Context)
    const [clicked, setClicked] = useState(false)

    const filterByPrice = (price) => {
        productStore.setCurrentPrice(price)

    }

    const chooseItem = (price) => {
        if (clicked && price.min === productStore.currentPrice?.min) {
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
                        {productStore.currentPrice ? `${productStore.currentPrice.min} - ${productStore.currentPrice.max}` : "Price"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            productStore.prices.map(
                                price => <Dropdown.Item key={price.min}
                                                        onClick={() => chooseItem(price)}
                                                        style = {clicked && price.min === productStore.currentPrice?.min ? { backgroundColor: 'lightblue' } : {}}
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