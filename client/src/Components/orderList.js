import React, { useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";

import {observer} from "mobx-react-lite";
import {deleteOrder, fetchOrders, updateOrderStatus} from "../http/orderApi";
import {fetchUsersArray} from "../http/userApi";



const OrderList = observer(() => {

        let [orders, setOrders] = useState([])

    useEffect(() => {

        fetchOrders().then(orders => {


            let ids = []
            orders.map(ord => ids.push(ord.user))

            if (ids.length > 0) {
                fetchUsersArray(ids).then(users => {
                    orders.map(order => order.fullUser = users.find(user => user._id === order.user))
                    setOrders(orders)
                })

            }

        })


    }, [])




        const changeStatus = (order, index) => {

            order.status === "accepted" ? order.status = "pending" : order.status = "accepted"

            console.log("AFTER CHANGE " + orders[index].status)
            const newArray = [...orders];
            newArray[index] = order
            setOrders(newArray)
            updateOrderStatus(order).then(data =>
                console.log(data)
            )

        }

    const removeOrder = (order, index) => {

        const newArray = [...orders].filter(ord => ord._id !== order._id);
        setOrders(newArray)
        deleteOrder(order._id).then(data =>
            console.log(data)
        )

    }





        return (
            <Container>
                <h2 style={{textAlign: "center", marginTop: 30}}>ALL ORDERS</h2>
                <Table striped bordered hover size="sm" className={"mt-5"}>
                    <thead>
                    <tr>

                        <th></th>
                        <th>User</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>

                    {

                        orders.map(
                            (order, idx) => (
                                <tr key={order._id}>

                                    <td> {idx + 1}</td>
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        { order.fullUser.email }
                                    </td>
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        {order.address.street + " " + order.address.house_num} </td>
                                    <td> {order.total || 1000}</td>
                                    <td>
                                        {order.status}
                                        <Button
                                            variant={order.status === "accepted" ?  "danger": "success"}
                                            onClick={() => changeStatus(order, idx)} className={"ms-4"}
                                            size={"sm"}> {order.status === "accepted" ? "Скасувати" : "Прийняти"} </Button>
                                        <Button
                                            className = "ms-4 btn-danger"

                                            onClick={() => removeOrder(order, idx)}
                                            size={"sm"}>  Видалити </Button>
                                    </td>

                                </tr>
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