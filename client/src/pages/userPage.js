import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Card, Container, Form} from "react-bootstrap";

const UserPage = () => {
    const {userStore} = useContext(Context)

    function editName(_id) {

    }

    return (
        <Container className={"d-flex justify-content-center"}>
            <Card
                style={{width: '40vw', border: 'none', boxShadow: "0 4px 8px rgba(0,0,0,0.2)", marginTop: "3rem"}}>
                <Card.Img
                    src={`${require('../static/user.png')}`}
                    style={{width: '18vw', height: '18vw', alignSelf: "center", marginTop: "5vw",}}/>
                <Card.Body>
                    <Card.Title
                        className={"d-flex justify-content-center"}
                        style={{fontSize: "4vw"}}
                    >
                        {userStore.user.email}
                    </Card.Title>
                    <Card.Text
                        className={"d-flex justify-content-center"}
                        style={{fontSize: "2vw"}}
                    >
                        Role: {userStore.user.role}
                    </Card.Text>
                    <Card.Text
                        className={"d-flex justify-content-center"}
                        style={{fontSize: "1.5vw"}}
                    >
                        We are together from {userStore.user.createdAt}
                    </Card.Text>
                    <Form className={"d-flex justify-content-center "}>
                        <Button
                            size={"lg"}
                            style={{background: "none", border: 'none'}}
                            className={"mt-2 me-3 btn-info"}
                            onClick={() => editName(userStore.user._id)}
                        >
                            Edit
                        </Button>
                        <Button
                            size={"lg"}
                            style={{background: "none", border: 'none'}}
                            className={"mt-2 btn-info"}
                            onClick={() => editName(userStore.user._id)}
                        >
                            Delete
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}


export default UserPage;