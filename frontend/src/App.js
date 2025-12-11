/**
 * @file Componente raíz de la aplicación.
 * @description Configura el enrutador, las rutas, los layouts y el sistema de notificaciones.
 * @requires react
 * @requires react-router-dom
 * @requires react-hot-toast
 * @requires ./styles/App.css
 * @requires ./components/molecules/Navbar
 * @requires ./components/layout/MainLayout
 * @requires ./components/layout/AuthLayout
 * @requires ./components/organisms/ErrorBoundary
 * @requires ./pages/Landing
 * @requires ./pages/Login
 * @requires ./pages/Register
 * @requires ./pages/Home
 * @requires ./pages/Seguimiento
 * @requires ./pages/Diario
 * @requires ./store/authStore
 */
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './styles/App.css';
import Navbar from "./components/molecules/Navbar";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import ErrorBoundary from "./components/organisms/ErrorBoundary";
import { CookieConsent } from "./components/molecules/CookieConsent";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Seguimiento from "./pages/Seguimiento";
import Diario from "./pages/Diario";
import { Privacy } from "./pages/legal/Privacy";
import { Cookies } from "./pages/legal/Cookies";
import { Terms } from "./pages/legal/Terms";

import { useAuthStore } from "./store/authStore";

/**
 * @function App
 * @description Componente principal que renderiza la aplicación, gestiona el enrutamiento y los layouts.
 * @returns {JSX.Element} El componente de la aplicación.
 */
function App() {
    const { user, token } = useAuthStore();

    /**
     * @function ProtectedRoute
     * @description Un componente que envuelve las rutas para protegerlas.
     * @description Redirige a los usuarios no autenticados a la página de login.
     * @param {object} props - Las propiedades del componente.
     * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán si el usuario está autenticado.
     * @returns {JSX.Element} Los componentes hijos o una redirección a /login.
     */
    const ProtectedRoute = ({ children }) => {
        // Verificar tanto user como token
        const isAuthenticated = user && token;

        if (!isAuthenticated) {
            console.log('ProtectedRoute: Usuario no autenticado, redirigiendo a login');
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    return (
        <ErrorBoundary>
            <Router>
                <CookieConsent />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                            padding: '16px',
                            borderRadius: '8px',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: '#4f46e5',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 4000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                <Routes>
                {/* Landing con Navbar global (mantiene diseño actual) */}
                <Route path="/" element={
                    <>
                        <Navbar />
                        <Landing />
                    </>
                } />

                {/* Auth pages con AuthLayout (sin navbar, diseño centrado) */}
                <Route path="/login" element={
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                } />

                <Route path="/register" element={
                    <AuthLayout>
                        <Register />
                    </AuthLayout>
                } />

                {/* Páginas protegidas con MainLayout (navbar + footer) */}
                <Route path="/home" element={
                    <MainLayout>
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    </MainLayout>
                } />

                <Route path="/seguimiento" element={
                    <MainLayout>
                        <ProtectedRoute>
                            <Seguimiento />
                        </ProtectedRoute>
                    </MainLayout>
                } />

                <Route path="/diario" element={
                    <MainLayout>
                        <ProtectedRoute>
                            <Diario />
                        </ProtectedRoute>
                    </MainLayout>
                } />

                {/* Páginas Legales */}
                <Route path="/legal/privacidad" element={<Privacy />} />
                <Route path="/legal/cookies" element={<Cookies />} />
                <Route path="/legal/terminos" element={<Terms />} />
            </Routes>
        </Router>
        </ErrorBoundary>
    );
}

export default App;
