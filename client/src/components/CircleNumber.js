import React from 'react';
import '../styles/CircleNumber.css';
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";


const CircleNumber = observer(({number}) => {

        return (
            <Container>
                <div
                    style={{fontSize: "1rem", display: "flex", margin: "auto"}} className={"circle"}>{number}</div>

            </Container>
        );

    }
)

export default CircleNumber;