import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Card, Container} from "react-bootstrap";

const Index = () => {
    const {userStore} = useContext(Context)
    const [joinDate, setJoinDate] = useState(userStore.user.createdAt)

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const date =  new Date(joinDate)
        const stringDate = '' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
        setJoinDate(stringDate)
    }, []);


    return (
        <Container className={"d-flex justify-content-center"}>
            <Card
                style={{width: '40vw', border: 'none', boxShadow: "0 4px 8px rgba(0,0,0,0.2)", marginTop: "3rem"}}>
                <Card.Img
                    src={`${require('../../static/user.png')}`}
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
                        Role: {userStore.user.role.toLowerCase()}
                    </Card.Text>
                    <Card.Text
                        className={"d-flex justify-content-center"}
                        style={{fontSize: "1.5vw"}}
                    >
                        We are together from {joinDate}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}


export default Index;