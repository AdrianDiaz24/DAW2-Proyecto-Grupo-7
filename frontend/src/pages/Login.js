import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { apiConfig } from "../config/api";
import "../styles/Auth-forms.css";

const Login = () => {
    const navigate = useNavigate();
    const { user, setAuth } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await fetch(apiConfig.endpoints.login, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                mode: "cors"
            });

            const data = await res.json().catch(() => ({}));

            if (res.status !== 200) {
                const msg = data?.message || "Error en login";
                return alert(msg);
            }

            setAuth(data.user, data.token); // asumes que guarda user y token
            navigate("/home");
        } catch (err) {
            alert("Error de red");
            console.error(err);
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
