import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiConfig } from '../config/api';

const Diario = () => {
    const [entradas, setEntradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const res = await fetch(apiConfig.endpoints.diario.getAll, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Error al obtener las entradas');
                }

                const data = await res.json();
                setEntradas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEntradas();
    }, [token]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1>Mi Diario</h1>
            <Link to="/diario/nuevo" className="btn">Nueva Entrada</Link>
            <div className="lista-entradas">
                {entradas.length > 0 ? (
                    entradas.map(entrada => (
                        <div key={entrada._id} className="card-entrada">
                            <Link to={`/diario/${entrada._id}`}>
                                <h2>{entrada.titulo}</h2>
                                <p>{new Date(entrada.createdAt).toLocaleDateString()}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No tienes ninguna entrada todavía. ¡Crea una!</p>
                )}
            </div>
        </div>
    );
};

export default Diario;

