import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiConfig } from '../config/api';

const VerEntrada = () => {
    const { id } = useParams();
    const [entrada, setEntrada] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchEntrada = async () => {
            try {
                const res = await fetch(apiConfig.endpoints.diario.getById(id), {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Error al obtener la entrada');
                }

                const data = await res.json();
                setEntrada(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEntrada();
    }, [id, token]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!entrada) return <div>Entrada no encontrada.</div>;

    return (
        <div className="container">
            <h1>{entrada.titulo}</h1>
            <p><em>{new Date(entrada.createdAt).toLocaleString()}</em></p>
            <div className="cuerpo-entrada">
                {entrada.cuerpo}
            </div>
        </div>
    );
};

export default VerEntrada;

