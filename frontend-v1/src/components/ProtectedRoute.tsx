// src/components/ProtectedRoute.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useSelector((state: RootState) => state.auth);

    if (auth.loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!auth.token || !auth.user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
