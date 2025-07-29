import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import CategoryMenu from "../Components/CategoryMenu";
import ProductList from "../Components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchProducts} from "../http/productApi";
import Pages from "../Components/Pages";
import {useMediaQuery} from 'react-responsive';
import {useNavigate} from "react-router-dom";
import PriceDropdown from "../Components/PriceDropdown";
import AlphabetDropdown from "../Components/AlphabetDropdown";

const MainPage = observer(() => {

        const [loading, setLoading] = useState(true);

        const isExtraSmallScreen = useMediaQuery({maxWidth: 575.99});
        const isSmallScreen = useMediaQuery({minWidth: 576, maxWidth: 767.99});
        const isMediumScreen = useMediaQuery({minWidth: 768, maxWidth: 991.99});
        const isLargeScreen = useMediaQuery({minWidth: 992, maxWidth: 1199.99});
        const isExtraLargeScreen = useMediaQuery({minWidth: 1200});

        const navigate = useNavigate()
        const {product, optionsStore} = useContext(Context)

        useEffect(() => {
            let path = optionsStore.path
            if (path !== '') {
                optionsStore.setPath('')
                navigate(path)
            }
            if (isExtraSmallScreen) product.setLimit(2)
            if (isSmallScreen) product.setLimit(4)
            if (isMediumScreen) product.setLimit(6)
            if (isLargeScreen || isExtraLargeScreen) product.setLimit(8)
            setLimit(product.limit)
        }, [isSmallScreen, isMediumScreen, isLargeScreen, isExtraSmallScreen, product])


        const [limit, setLimit] = useState(product.limit)
        const [more, setMore] = useState(false)

        const resetFilters = () => {
            product.setCurrentCategory(null)
            product.setCurrentSearch('')
            product.setCurrentPrice(null)
            product.setCurrentAlphabetOrder(null)
        }

        const showMore = () => {
            product.setLimit(20)
            setMore(true)
        }

        const showLess = () => {
            product.setLimit(limit)
            setMore(false)
        }
        const getProducts = async () => {
            const productsData = await fetchProducts(
                product.currentCategory,
                product.currentSearch,
                product.page,
                product.limit,
                product.currentPrice,
                product.currentAlphabetOrder
            )
            product.setProducts(productsData.products)
            product.setTotalCount(productsData.count)
        }

        useEffect(() => {
                setLoading(true)
                const getCategories = async () => {
                    const categories = await fetchCategories()
                    product.setCategories(categories)
                }
                const promises = []
                promises.push(getCategories())
                promises.push(getProducts())
                Promise.all(promises).catch(error => console.log(error)).finally(() => setLoading(false))
            }
            , []
        )
        ;

        useEffect(() => {
            setLoading(true)
            getProducts().finally(() => setLoading(false))
        }, [
            product.currentSearch,
            product.currentCategory,
            product.page,
            product.limit,
            product.currentPrice,
            product.currentAlphabetOrder
        ]);

        // if (loading) {
        //     return <div> Loading ... </div>
        // }
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
                        value={product.currentSearch}
                        onChange={(e) => product.setCurrentSearch(e.target.value)}
                    />
                </Container>
                <Container className="d-flex m-auto mt-5">
                    <Form style={{width: "100%"}}>
                        <Col md={12} lg={12} xs={12} xl={12}>
                            <ProductList/>
                            <Button
                                className={'btn-light'}
                                onClick={more ? showLess : showMore}>{more ? "less <" : "more >"}</Button>
                            <Pages/>
                        </Col>
                    </Form>
                </Container>
            </>
        );
    }
)

export default MainPage;