import { ProtectedRoute } from 'components/ProtectedRoute';
import { DefaultLayout } from 'modules/CommonPage/DefaultLayout';
import Login from 'pages/login/Login';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { allRoutes as routes } from 'routing/routes';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { fetchUser } from 'store/slices/auth/authSlice';

export const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (auth.token && !auth.user && !auth.loading) {
            dispatch(fetchUser());
        }
    }, [auth.token, auth.user, auth.loading, dispatch]);

    return (
        <DefaultLayout>
            {/* <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes> */}
            {/* <Router> */}
            <Routes>
                {/* Маршрут для логина */}
                <Route path="/login" element={!auth.token ? <Login /> : <Navigate to="/admin" />} />

                {/* Основные маршруты */}
                {routes.map((route) => {
                    if (route.protected) {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <route.component />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    }

                    return (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    );
                })}

                {/* Маршрут "Не найдено" */}
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
            {/* </Router> */}
        </DefaultLayout>
    );
};
