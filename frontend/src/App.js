// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './styles/App.css';
import Navbar from "./components/molecules/Navbar";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import ErrorBoundary from "./components/organisms/ErrorBoundary";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Seguimiento from "./pages/Seguimiento";
import Diario from "./pages/Diario";
import Perfil from "./pages/Perfil";

import { useAuthStore } from "./store/authStore";

function App() {
    const { user, token } = useAuthStore();

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

                <Route path="/perfil" element={
                    <MainLayout>
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    </MainLayout>
                } />
            </Routes>
        </Router>
        </ErrorBoundary>
    );
}

export default App;
