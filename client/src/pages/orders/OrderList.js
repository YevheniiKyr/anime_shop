import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchOrders} from "../../http/orderApi";
import OrderItem from "./OrderItem";
import Loader from "../../components/Loader";

const OrderList = observer(() => {

        let [orders, setOrders] = useState([])
        let [loading, setLoading] = useState(false)

        useEffect(() => {
            setLoading(true)
            fetchOrders()
                .then(orders => setOrders(orders))
                .finally(() => setLoading(false))
        }, [])

        if (loading) {
            return <Loader/>
        }
        return (
            <Container>
                <h2 className="mt-4 text-center">ALL ORDERS</h2>
                <Table striped bordered hover size="sm" className={"mt-4"}>
                    <thead>
                    <tr className="align-middle text-center">
                        {['', 'User', 'Address', 'Total', 'Status', 'Actions'].map((text, i) => (
                            <th key={i} className="p-4">{text}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map(
                            (order, idx) => (
                                <OrderItem
                                    key={idx}
                                    idx={idx}
                                    order={order}
                                    orders={orders}
                                    setOrders={setOrders}
                                />
                            )
                        )
                    }
                    </tbody>
                </Table>
            </Container>
        );
    }
)

export default OrderList;