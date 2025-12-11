/**
 * @file Página de Artículos Médicos sobre Salud Mental
 * @description Muestra una colección de artículos sobre salud mental con opciones de filtrado y búsqueda
 * @requires react
 * @requires ../service/articlesService
 * @requires ../styles/pages/Articulos.css
 */

import React, { useState, useEffect } from 'react';
import articlesService from '../service/articlesService';
import '../styles/pages/Articulos.css';

/**
 * @function Articulos
 * @description Componente principal para mostrar artículos sobre salud mental
 * @returns {JSX.Element} La página de artículos
 */
const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [imagenesError, setImagenesError] = useState({});

    useEffect(() => {
        cargarDatos();
    }, []);

    /**
     * @function handleImageError
     * @description Maneja errores de carga de imágenes usando una imagen por defecto
     * @param {Event} e - Evento de error
     * @param {number} articuloId - ID del artículo
     */
    const handleImageError = (e, articuloId) => {
        if (!imagenesError[articuloId]) {
            setImagenesError(prev => ({ ...prev, [articuloId]: true }));
            e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop&q=80';
        }
    };

    /**
     * @function cargarDatos
     * @description Carga los artículos reales de PubMed y categorías disponibles
     * @async
     */
    const cargarDatos = async () => {
        try {
            setCargando(true);

            // Obtener artículos de PubMed API
            const resultado = await articlesService.obtenerArticulos();
            if (resultado.success && resultado.data.length > 0) {
                setArticulos(resultado.data);
            }

            // Obtener categorías
            const cats = await articlesService.obtenerCategorias();
            setCategorias(cats);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setCategorias(['Ansiedad', 'Depresión', 'Ejercicio', 'Estrés', 'Mindfulness', 'Nutrición', 'Relaciones', 'Sueño']);
        } finally {
            setCargando(false);
        }
    };

    /**
     * @function filtrarArticulos
     * @description Filtra los artículos según búsqueda y categoría
     * @returns {Array} Artículos filtrados
     */
    const filtrarArticulos = () => {
        let resultado = articulos;

        // Filtrar por categoría
        if (categoriaSeleccionada) {
            resultado = resultado.filter(a => a.categoria === categoriaSeleccionada);
        }

        // Filtrar por término de búsqueda
        if (terminoBusqueda) {
            const termino = terminoBusqueda.toLowerCase();
            resultado = resultado.filter(a =>
                a.titulo.toLowerCase().includes(termino) ||
                a.descripcion.toLowerCase().includes(termino)
            );
        }

        return resultado;
    };

    const articulosFiltrados = filtrarArticulos();

    return (
        <div className="articulos-container">
            <div className="articulos-header">
                <h1>Artículos sobre Salud Mental</h1>
                <p>Explora artículos científicos de PubMed sobre salud mental y bienestar emocional</p>
            </div>

            <div className="articulos-controles">
                {/* Barra de búsqueda */}
                <div className="busqueda-box">
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                        className="input-busqueda"
                    />
                    <span className="icono-busqueda">🔍</span>
                </div>

                {/* Filtro de categorías */}
                <div className="filtro-categorias">
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="select-categoria"
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {cargando ? (
                <div className="cargando">
                    <p>Cargando artículos en español sobre salud mental...</p>
                </div>
            ) : articulosFiltrados.length === 0 ? (
                <div className="sin-resultados">
                    <p>No se encontraron artículos que coincidan con tu búsqueda.</p>
                </div>
            ) : (
                <div className="articulos-grid">
                    {articulosFiltrados.map(articulo => (
                        <div
                            key={articulo.id}
                            className="articulo-card"
                            onClick={() => setArticuloSeleccionado(articulo)}
                        >
                            <img src={articulo.imagen} alt={articulo.titulo} className="articulo-imagen" />
                            <div className="articulo-contenido">
                                <span className="categoria-badge">{articulo.categoria}</span>
                                <h3>{articulo.titulo}</h3>
                                <p className="descripcion">{articulo.descripcion}</p>
                                <div className="articulo-footer">
                                    <span className="autor">{articulo.autor}</span>
                                    <span className="fecha">
                                        {new Date(articulo.fecha).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de artículo detallado */}
            {articuloSeleccionado && (
                <div className="modal-overlay" onClick={() => setArticuloSeleccionado(null)}>
                    <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setArticuloSeleccionado(null)}>✕</button>

                        <img
                            src={articuloSeleccionado.imagen}
                            alt={articuloSeleccionado.titulo}
                            onError={(e) => handleImageError(e, articuloSeleccionado.id)}
                        />

                        <div className="modal-body">
                            <span className="categoria-badge">{articuloSeleccionado.categoria}</span>
                            <h2>{articuloSeleccionado.titulo}</h2>

                            <div className="metadata">
                                <span className="autor">Por: {articuloSeleccionado.autor}</span>
                                <span className="fuente">Fuente: {articuloSeleccionado.fuente}</span>
                                <span className="fecha">
                                    {new Date(articuloSeleccionado.fecha).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div className="articulo-body">
                                <h4>Descripción</h4>
                                <p>{articuloSeleccionado.descripcion}</p>

                                <h4>Contenido</h4>
                                <p>{articuloSeleccionado.contenido}</p>
                            </div>

                            <div className="modal-actions">
                                {articuloSeleccionado.url && articuloSeleccionado.url !== '#' && (
                                    <a href={articuloSeleccionado.url} target="_blank" rel="noopener noreferrer" className="btn-leer-mas">
                                        Leer en PubMed
                                    </a>
                                )}
                                <button className="btn-marcar">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Articulos;

