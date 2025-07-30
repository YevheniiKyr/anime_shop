import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    ORDER_ROUTE,
    PRODUCT_ROUTE,
    RECOMMENDATIONS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    SHOW_ORDERS_ROUTE,
    SIMILAR_PRODUCTS_ROUTE,
    USER_ROUTE
} from "./utils/constRoutes";
import mainPage from "./pages/mainPage";
import authPage from "./pages/authPage";
import productPage from "./pages/productPage";
import basketPage from "./pages/basketPage";
import AdminPage from "./pages/adminPage";
import orderPage from "./pages/orderPage";
import manageOrdersPage from "./pages/manageOrdersPage";
import userPage from "./pages/userPage";
import recommendationsPage from "./pages/recommendationsPage";
import similarProductsPage from "./pages/similarProductsPage";

export const authRoutes = [
    {
        path: BASKET_ROUTE + '/:id',
        Component: basketPage
    },
    {
        path: ORDER_ROUTE + '/:id',
        Component: orderPage
    },
    {
        path: USER_ROUTE + '/:id',
        Component: userPage
    },
    {
        path: RECOMMENDATIONS_ROUTE,
        Component: recommendationsPage
    },
    {
        path: SIMILAR_PRODUCTS_ROUTE + '/:id',
        Component: similarProductsPage
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: SHOW_ORDERS_ROUTE,
        Component: manageOrdersPage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: mainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: authPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: authPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: productPage
    },
]