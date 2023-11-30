import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProducts} from "../http/productApi";
import {Container, Dropdown, Row} from "react-bootstrap";
import {ALPHABET_ORDER} from "../utils/consts";

const AlphabetDropdown = observer(() => {

        const {product} = useContext(Context)
        const [clicked, setClicked] = useState(false)
        const chooseItem = (key) => {
            if (clicked && key === product.currentAlphabetOrder) {
                setClicked(false)
                filterByAlphabet(null)
            } else {
                setClicked(true)
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
                            { ALPHABET_ORDER[product.currentAlphabetOrder] || "sort "}
                        </Dropdown.Toggle>


                        <Dropdown.Menu>
                            {


                                product.alphabetOrders.map(
                                    ([key, value]) => <Dropdown.Item key={key}
                                                          onClick={() => chooseItem(key)}
                                                          style={clicked && key === product.currentAlphabetOrder ? {backgroundColor: 'lightblue'} : {}}
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