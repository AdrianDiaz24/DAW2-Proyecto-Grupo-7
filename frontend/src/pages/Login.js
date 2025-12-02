/**
 * @file Página de Inicio de Sesión (Login).
 * @description Formulario para que los usuarios existentes inicien sesión en la aplicación.
 * @requires react
 * @requires react-router-dom
 * @requires ../store/authStore
 * @requires ../config/api
 * @requires ../styles/Auth-forms.css
 */
// RUTA: frontend/src/pages/Login.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { apiConfig } from "../config/api";
import "../styles/Auth-forms.css";

/**
 * @function Login
 * @description Componente que renderiza el formulario de inicio de sesión y maneja la lógica de autenticación.
 * @returns {JSX.Element} La página de inicio de sesión.
 */
const Login = () => {
    const navigate = useNavigate();
    const { user, setAuth } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redirigir si ya está autenticado
    useEffect(() => {
        // Comprobamos 'user' y también el token en el store para más seguridad
        const token = useAuthStore.getState().token;
        if (user && token) {
            navigate("/home");
        }
    }, [user, navigate]);

    /**
     * @function handleLogin
     * @description Envía las credenciales del usuario al backend para la autenticación.
     * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
     * @async
     */
    async function handleLogin(e) {
        e.preventDefault();
        console.log("Attempting login with:", { email }); // DEBUG: Ver con qué email se intenta
        try {
            const res = await fetch(apiConfig.endpoints.login, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                mode: "cors"
            });

            const data = await res.json().catch(() => ({}));

            console.log("Response status from server:", res.status); // DEBUG: Ver el código de estado
            console.log("Data received from server:", data); // DEBUG: Ver la respuesta completa

            if (res.status !== 200) {
                const msg = data?.message || "Error en el inicio de sesión. Revisa tus credenciales.";
                console.error("Login failed with message:", msg); // DEBUG: Ver el mensaje de error
                return alert(msg);
            }

            // Asegurarnos de que los datos existen antes de guardarlos
            if (data.user && data.token) {
                console.log("Login successful. Setting auth data:", { user: data.user, token: data.token }); // DEBUG
                setAuth(data.user, data.token);
                navigate("/home");
            } else {
                console.error("Login response is missing user or token data."); // DEBUG
                alert("Error inesperado en la respuesta del servidor.");
            }

        } catch (err) {
            alert("Error de red. No se pudo conectar con el servidor.");
            console.error("Network or fetch error:", err); // DEBUG
        }
    }

    return (
        <div className="auth-form-container">
            <h1>Iniciar sesión</h1>
            <p className="subtitle">Bienvenido de nuevo a MindCare</p>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Tu contraseña"
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            <div className="auth-form-footer">
                <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                <p className="auth-back-link"><Link to="/">← Volver al inicio</Link></p>
            </div>
        </div>
    );
};

export default Login;
