import {Button, Form, Modal} from "react-bootstrap";
import {useContext, useState} from "react";

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createCategory} from "../../http/categoryApi";


const AddCategory = observer (({show, onHide}) => {

    const {productStore} = useContext(Context)

    const [title, setTitle] = useState('')
    const addCategory = () => {

        createCategory(title).then(data => {
            setTitle('')
            console.log("DATA " + data)
            let newCategories = [...productStore.categories]
            newCategories.push(data)
            console.log(newCategories)
            productStore.setCategories(newCategories)
            //onHide()
        })
    }

        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Додати категорію
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            value = {title}
                            onChange = {e => setTitle(e.target.value)}
                            placeholder= {"Введіть назву категорії"}
                        />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                    <Button variant="outline-success" onClick={addCategory}>Додати</Button>
                </Modal.Footer>
            </Modal>
        );
    }
)

export default AddCategory;