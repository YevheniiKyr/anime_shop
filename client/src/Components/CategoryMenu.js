import {Container, Dropdown, Row} from "react-bootstrap";
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const CategoryMenu = observer(() => {

        const {product} = useContext(Context)
        const [clicked, setClicked] = useState(false)

        const chooseItem = (cat) => {
            if(clicked && cat.name === product.currentCategory?.name) {
                setClicked(false)
                filterByCategory(null)
            }
            else {
                setClicked(true)
                filterByCategory(cat)
            }
        }

        const filterByCategory = (cat) => {

            product.setCurrentCategory(cat)
            product.setPage(1)

        }
        return (
            <Container>
                <Row className="mt-5">
                    <Dropdown>
                        <Dropdown.Toggle style={{background: 'none', border: 'none', color: 'grey'}} id="dropdown-basic">
                            {product.currentCategory ? product.currentCategory.name : "Category"}
                        </Dropdown.Toggle>


                        <Dropdown.Menu>
                            {
                                product.categories.map(
                                    cat => <Dropdown.Item key={cat.name}
                                                          onClick={
                                                              () => chooseItem(cat)
                                                          }
                                                          style={clicked && cat.name === product.currentCategory?.name ? {backgroundColor: 'lightblue'} : {}}
                                    >
                                        {cat.name}
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

export default CategoryMenu;
