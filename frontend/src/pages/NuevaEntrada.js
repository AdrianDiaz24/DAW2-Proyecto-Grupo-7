import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiConfig } from '../config/api';

const NuevaEntrada = () => {
    const [titulo, setTitulo] = useState('');
    const [cuerpo, setCuerpo] = useState('');
    const [error, setError] = useState(null);
    const { token } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!titulo.trim() || !cuerpo.trim()) {
            return setError('El título y el cuerpo no pueden estar vacíos.');
        }

        try {
            const res = await fetch(apiConfig.endpoints.diario.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ titulo, cuerpo })
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Error al crear la entrada');
            }

            navigate('/diario');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Nueva Entrada del Diario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cuerpo:</label>
                    <textarea
                        value={cuerpo}
                        onChange={(e) => setCuerpo(e.target.value)}
                        required
                        rows="10"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Guardar Entrada</button>
            </form>
        </div>
    );
};

export default NuevaEntrada;

