import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { apiConfig } from "../config/api";

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

            const data = await res.json().catch(() => null);

            if (!res.ok) {
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
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
