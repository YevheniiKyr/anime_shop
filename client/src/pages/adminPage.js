import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import AddCategory from "../components/modals/AddCategory";
import AddProduct from "../components/modals/AddProduct";
import {useNavigate} from "react-router-dom";
import {SHOW_ORDERS_ROUTE} from "../utils/constRoutes";

const AdminPage = () => {

    const[categoryVisible, setCategoryVisible] = useState(false)
    const[productVisible, setProductVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <Container className={"d-flex flex-column mt-4"} style={{width: '50%'}}>
            <Button
                size = {"lg"}
                className = "mt-3 btn-success"
                onClick={()=>setCategoryVisible(true)}
            >
                Додати категорію
            </Button>
            <Button
                size = {"lg"}
                className = "mt-3 btn-success"
                onClick={()=>setProductVisible(true)}
            >
                Додати товар
            </Button>
            <AddCategory
                show = {categoryVisible}
                onHide ={()=>setCategoryVisible(false)}
            />
            <AddProduct
                show = {productVisible}
                onHide ={()=>setProductVisible(false)}
            />
            <Button
                size = {"lg"}
                className = "mt-3 btn-success"
                onClick={()=>navigate(SHOW_ORDERS_ROUTE)}
            >
                Керувати замовленнями
            </Button>
        </Container>

    );
};

export default AdminPage;