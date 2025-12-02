/**
 * @file Página de Registro (Register).
 * @description Formulario para que nuevos usuarios creen una cuenta.
 * @requires react
 * @requires react-router-dom
 * @requires ../store/authStore
 * @requires ../config/api
 * @requires ../styles/Auth-forms.css
 */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { apiConfig } from "../config/api";
import "../styles/Auth-forms.css";

/**
 * @function Register
 * @description Componente que renderiza el formulario de registro y maneja la lógica de creación de cuenta.
 * @returns {JSX.Element} La página de registro.
 */
const Register = () => {
    const navigate = useNavigate();
    const { user, setAuth } = useAuthStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    /**
     * @function handleRegister
     * @description Valida los datos del formulario y los envía al backend para crear un nuevo usuario.
     * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
     * @async
     */
    async function handleRegister(e) {
        e.preventDefault();

        // Validaciones básicas
        if (name.trim().length < 2) {
            return alert('El nombre debe tener al menos 2 caracteres');
        }

        if (password.length < 8) {
            return alert('La contraseña debe tener al menos 8 caracteres');
        }

        if (password !== confirmPassword) {
            return alert('Las contraseñas no coinciden');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return alert('Por favor, introduce un email válido');
        }

        try {
            const res = await fetch(apiConfig.endpoints.register, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                mode: "cors"
            });

            const data = await res.json().catch(() => ({}));

            if (res.status !== 201) {
                const msg = data?.message || "Error en registro";
                return alert(msg);
            }

            setAuth(data.user, data.token); // guardamos user y token en el store
            navigate("/home");
        } catch (err) {
            alert("Error de red");
            console.error(err);
        }
    }

    return (
        <div className="auth-form-container">
            <h1>Crear cuenta</h1>
            <p className="subtitle">Únete a MindCare y comienza tu viaje hacia el bienestar</p>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength="2"
                        placeholder="Ej: Juan Pérez"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ejemplo@correo.com"
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Mínimo 8 caracteres"
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Repite tu contraseña"
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <div className="auth-form-footer">
                <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                <p className="auth-back-link"><Link to="/">← Volver al inicio</Link></p>
            </div>
        </div>
    );
};

export default Register;
