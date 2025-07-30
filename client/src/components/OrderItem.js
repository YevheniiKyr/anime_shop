import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";


const OrderItem = observer(({order}) => {

    return (
        <Card className={"mt-2"} style={{borderColor: 'darkgrey'}}>
            <ListGroup>
                <InputGroup>
                <ListGroupItem border="0">{2}</ListGroupItem>
                <ListGroupItem border="0"> 3000 </ListGroupItem>
                <ListGroupItem border="0"> {order.address.street + " " +  order.address.house_num }</ListGroupItem>
                <ListGroupItem border="0"> order.status </ListGroupItem>
                    <Button> Замовлення прийнято </Button>
                </InputGroup>
            </ListGroup>
        </Card>
    );
})

export default OrderItem;