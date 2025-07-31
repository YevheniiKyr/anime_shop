import React from 'react';
import {Container, Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <Container className={"d-flex justify-content-center align-items-center"}>
            <Spinner
                style={{width: "30rem", height: "30rem"}}
                animation={"border"}
            />
        </Container>
    );
};

export default Loader;