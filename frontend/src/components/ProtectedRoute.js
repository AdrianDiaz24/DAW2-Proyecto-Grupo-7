import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
    const { token } = useAuthStore();

    if (!token) {
        // Si no hay token, redirigir al login
        return <Navigate to="/login" replace />;
    }

    // Si hay token, renderizar el contenido de la ruta hija
    return <Outlet />;
};

export default ProtectedRoute;

