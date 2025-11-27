// src/pages/Home.js
import React from "react";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/authStore";

const Home = () => {
    const { user } = useAuthStore();

    return (
        <div className="container">
            <h1>Home</h1>
            <p>¡Bienvenido, {user?.nombre || user?.email}!</p>
            <p>Esta es la página protegida, solo accesible si estás logueado.</p>

            {user && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Información del usuario:</h3>
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.alias && <p><strong>Alias:</strong> {user.alias}</p>}
                    <p><strong>Cuenta creada:</strong> {new Date(user.createdAt).toLocaleDateString('es-ES')}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
