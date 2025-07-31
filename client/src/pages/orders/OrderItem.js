import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";
import {deleteOrder, updateOrder} from "../../http/orderApi";
import {AiTwotoneDelete} from "react-icons/ai"
import OrderStatuses from "../../consts/orderStatuses";

const OrderItem = observer(({order, idx, orders, setOrders}) => {

    const changeStatus = async (status) => {
        const updatedOrder = {...order, status}
        await updateOrder(updatedOrder)
        const updatedOrders = orders.map(o => o._id === order._id ? updatedOrder : o)
        setOrders(updatedOrders)
    }

    const removeOrder = async (order) => {
        await deleteOrder(order._id)
        const newArray = [...orders].filter(ord => ord._id !== order._id);
        setOrders(newArray)
    }

    return (
        <tr
            className="align-middle text-center"
            key={order._id}
        >
            <td> {idx + 1}</td>
            <td> {order.user.email} </td>
            <td> {order.address} </td>
            <td> {order.total || 1000}</td>
            <td> {order.status} </td>
            <td>
                <Container className="d-flex flex-wrap p-4 gap-4">
                    <Button
                        className="btn-info"
                        onClick={() => changeStatus(OrderStatuses.Pending)}
                        size="sm"
                    >
                        Pending
                    </Button>
                    <Button
                        className="bg-success bg-opacity-75 border-0 text-black"
                        onClick={() => changeStatus(OrderStatuses.Confirmed)}
                        size="sm"
                    >
                        Confirm
                    </Button>
                    <Button
                        className="btn-light"
                        onClick={() => changeStatus(OrderStatuses.OnTheWay)}
                        size="sm"
                    >
                        On the way
                    </Button>
                    <Button
                        className="btn-success"
                        onClick={() => changeStatus(OrderStatuses.Fulfilled)}
                        size="sm"
                    >
                        Delivered
                    </Button>
                    <Button
                        className="bg-danger bg-opacity-75 border-0 text-black"
                        onClick={() => changeStatus(OrderStatuses.Canceled)}
                        size="sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn-danger d-flex justify-content-center align-items-center"
                        onClick={() => removeOrder(order, idx)}
                        size="sm"
                    >
                        <AiTwotoneDelete/>
                    </Button>
                </Container>
            </td>
        </tr>
    );
})

export default OrderItem;