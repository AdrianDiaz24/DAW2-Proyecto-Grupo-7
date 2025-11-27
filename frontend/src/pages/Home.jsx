import React from "react";
import { useAuthStore } from "../store/authStore";
// import { Line } from "react-chartjs-2"; // TODO: Instalar react-chartjs-2 y chart.js
// import MainLayout from "../components/layout/MainLayout"; // TODO: Implementar MainLayout si es necesario
import "../styles/Home.css";

const Home = () => {
    const { user } = useAuthStore();

    // TODO: Descomentar cuando se instale react-chartjs-2
    // Datos ficticios para la gráfica
    /* const data = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        datasets: [
            {
                label: "Estado emocional",
                data: [3, 4, 2, 5, 3],
                fill: false,
                borderColor: "#4f46e5",
                tension: 0.4,
            },
        ],
    }; */

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
