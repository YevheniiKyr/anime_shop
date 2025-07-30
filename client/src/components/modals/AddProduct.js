import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct} from "../../http/productApi";
import {fetchCategories} from "../../http/categoryApi";
import {observer} from "mobx-react-lite";

const AddProduct = observer(({show, onHide}) => {

        const {productStore} = useContext(Context)

        const [name, setName] = useState('')
        const [desc, setDesc] = useState('')
        const [price, setPrice] = useState(null)
        const [file, setFile] = useState(null)
        const [selectedCategory, setSelectedCategory] = useState({name: null, _id: null})

        useEffect(() => {
            fetchCategories().then(data => productStore.setCategories(data))

        }, [])
        const selectFile = e => {
            setFile(e.target.files[0])
        }

        const addProduct = () => {
            const prodData = new FormData();
            prodData.append('title', name)
            prodData.append('price', `${price}`)
            prodData.append('description', desc)
            prodData.append('img', file)
            prodData.append('category', selectedCategory._id)
            createProduct(prodData).then(r => console.log('wow'))
            onHide()
        }
        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Додати товар
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{selectedCategory.name || "Оберіть категорію"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    productStore.categories.map(type =>
                                        <Dropdown.Item
                                            onClick={() => setSelectedCategory(type)}
                                            key={type._id}
                                        >
                                            {type.name}
                                        </Dropdown.Item>
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-2"
                            placeholder="Введіть назву товару"
                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-2"
                            placeholder="Введіть ціну товару"
                            type="number"
                        />
                        <Form.Control
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            className="mt-2"
                            placeholder="Введіть опис товару"
                        />


                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={selectFile}
                        />
                        <hr/>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                    <Button variant="outline-success" onClick={addProduct}>Додати</Button>
                </Modal.Footer>
            </Modal>
        );
    }
)

export default AddProduct;