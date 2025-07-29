import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Dropdown, Row} from "react-bootstrap";
import {ALPHABET_ORDER} from "../utils/consts";

const AlphabetDropdown = observer(() => {

        const {product} = useContext(Context)
        const [clicked, setClicked] = useState(false)

    useEffect(() => {

    })

        const chooseItem = (key) => {
            if (key === product.currentAlphabetOrder) {
                filterByAlphabet(null)
            } else {
                filterByAlphabet(key)
            }
        }

        const filterByAlphabet = (key) => {
            product.setCurrentAlphabetOrder(key)
        }

        return (
            <Container>
                <Row className="mt-5">
                    <Dropdown>
                        <Dropdown.Toggle style={{background: 'none', border: 'none', color: 'grey'}} id="dropdown-basic">
                            {ALPHABET_ORDER[product.currentAlphabetOrder] || "sort "}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                product.alphabetOrders.map(
                                    ([key, value]) =>
                                        <Dropdown.Item key={key}
                                                       onClick={() => chooseItem(key)}
                                                       style={key === product.currentAlphabetOrder ? {backgroundColor: 'lightblue'} : {}}
                                        >
                                        {value}
                                        </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Container>
        );
    }
)


export default AlphabetDropdown;