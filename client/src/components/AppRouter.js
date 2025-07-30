import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {SHOP_ROUTE} from "../utils/constRoutes";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {

    const {userStore} = useContext(Context)
    return (
        <Routes>
            {userStore?.isAuth && userStore?.user?.role === 'ADMIN' && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path}  element={<Component/>} exact/>
            )}
            {userStore?.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path}  element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path}  element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
        </Routes>
    );
})

export default AppRouter;