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
import mainPage from "./pages/main";
import authPage from "./pages/auth";
import productPage from "./pages/product";
import basketPage from "./pages/basket";
import Index from "./pages/admin";
import orderPage from "./pages/order";
import manageOrdersPage from "./pages/orders";
import userPage from "./pages/user";
import recommendationsPage from "./pages/recommendationsPage";
import similarProductsPage from "./pages/similarProductsPage";

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: basketPage
    },
    {
        path: ORDER_ROUTE,
        Component: orderPage
    },
    {
        path: USER_ROUTE,
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
        Component: Index
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