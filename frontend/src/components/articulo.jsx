
import React, { useState, useEffect } from 'react';

function ArticuloDepresion({ endpoint = 'https://healthdata.gov/api/data_endpoint_for_depression' }) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(endpoint, { signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (cancelled) return;
                const normalized = Array.isArray(data) ? (data[0] || null) : data;
                setArticle(normalized);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(err.message || 'Error desconocido');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [endpoint]);

    if (loading) return <p>Cargando artículo...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!article) return <p>No hay datos disponibles</p>;

    const title = article.title || article.name || 'Título no disponible';
    const description = article.description || article.summary || 'Descripción no disponible';

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default ArticuloDepresion;
