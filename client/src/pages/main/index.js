import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import CategoryMenu from "./CategoryMenu";
import ProductList from "./ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchProducts} from "../../http/productApi";
import {fetchCategories} from "../../http/categoryApi"
import Pages from "../../components/Pages";
import {useMediaQuery} from 'react-responsive';
import {useNavigate} from "react-router-dom";
import PriceDropdown from "./PriceDropdown";
import AlphabetDropdown from "./AlphabetDropdown";


const Index = observer(() => {

        const isExtraSmallScreen = useMediaQuery({maxWidth: 575.99});
        const isSmallScreen = useMediaQuery({minWidth: 576, maxWidth: 767.99});
        const isMediumScreen = useMediaQuery({minWidth: 768, maxWidth: 991.99});
        const isLargeScreen = useMediaQuery({minWidth: 992, maxWidth: 1199.99});
        const isExtraLargeScreen = useMediaQuery({minWidth: 1200});

        const navigate = useNavigate()
        const {productStore} = useContext(Context)
        const [loading, setLoading] = useState(false)

        useEffect(() => {
            if (isExtraSmallScreen) productStore.setLimit(2)
            if (isSmallScreen) productStore.setLimit(4)
            if (isMediumScreen) productStore.setLimit(6)
            if (isLargeScreen || isExtraLargeScreen) productStore.setLimit(8)
        }, [isSmallScreen, isMediumScreen, isLargeScreen, isExtraSmallScreen, isExtraLargeScreen])


        const resetFilters = () => {
            productStore.setCurrentCategory(null)
            productStore.setCurrentSearch('')
            productStore.setCurrentPrice(null)
            productStore.setCurrentAlphabetOrder(null)
        }

        const getProducts = async () => {
            const productsData = await fetchProducts(
                productStore.currentCategory,
                productStore.currentSearch,
                productStore.page,
                productStore.limit,
                productStore.currentPrice,
                productStore.currentAlphabetOrder
            )
            productStore.setProducts(productsData.products)
            productStore.setTotalCount(productsData.count)
        }

        const getCategories = async () => {
            const categories = await fetchCategories()
            productStore.setCategories(categories)
        }

        useEffect(() => {
                setLoading(true)
                const promises = []
                promises.push(getCategories())
                promises.push(getProducts())
                Promise.all(promises).catch(error => console.log(error)).finally(() => setLoading(false))
            }
            , [])

        useEffect(() => {
            setLoading(true)
            getProducts().finally(() => setLoading(false))
        }, [
            productStore.currentSearch,
            productStore.currentCategory,
            productStore.page,
            productStore.limit,
            productStore.currentPrice,
            productStore.currentAlphabetOrder
        ]);

        if (loading) {
            return <></>;
        }
        return (
            <>
                <Container className={"d-flex"}>
                    <Button
                        className={"btn-success mt-5 me-2"}
                        onClick={resetFilters}>
                        reset
                    </Button>
                    <CategoryMenu/>
                    <PriceDropdown/>
                    <AlphabetDropdown/>
                    <Form.Control
                        className={"mt-5"}
                        type="text"
                        placeholder="Search"
                        value={productStore.currentSearch}
                        onChange={(e) => productStore.setCurrentSearch(e.target.value)}
                    />
                </Container>
                <Container className="d-flex m-auto mt-5">
                    <Form style={{width: "100%"}}>
                        <Col md={12} lg={12} xs={12} xl={12}>
                            <ProductList/>
                            <Pages/>
                        </Col>
                    </Form>
                </Container>
            </>
        );
    }
)

export default Index;