// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './styles/App.css';
import Navbar from "./components/molecules/Navbar";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Seguimiento from "./pages/Seguimiento";
import Diario from "./pages/Diario";

import { useAuthStore } from "./store/authStore";

function App() {
    const { user } = useAuthStore();

    const ProtectedRoute = ({ children }) => {
        return user ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
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
            </Routes>
        </Router>

    );
}

export default App;
