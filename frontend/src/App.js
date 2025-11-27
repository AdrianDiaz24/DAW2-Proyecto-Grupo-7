// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './styles/App.css';
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import Diario from "./pages/Diario";
import NuevaEntrada from "./pages/NuevaEntrada";
import VerEntrada from "./pages/VerEntrada";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAuthStore } from "./store/authStore";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas Protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/diario" element={<Diario />} />
                    <Route path="/diario/nuevo" element={<NuevaEntrada />} />
                    <Route path="/diario/:id" element={<VerEntrada />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
