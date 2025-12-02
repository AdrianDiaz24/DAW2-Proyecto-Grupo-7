/**
 * @file Componente ErrorBoundary para capturar errores de JavaScript en sus componentes hijos.
 * @description Muestra una UI de fallback cuando ocurre un error.
 * @requires react
 * @requires prop-types
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class ErrorBoundary
 * @extends React.Component
 * @description Un componente de clase que captura errores en sus componentes hijos,
 *              registra esos errores y muestra una UI de fallback.
 */
class ErrorBoundary extends React.Component {
    /**
     * @constructor
     * @param {object} props - Las propiedades pasadas al componente.
     */
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    /**
     * @static
     * @function getDerivedStateFromError
     * @description Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
     * @param {Error} error - El error que fue lanzado.
     * @returns {object} Un objeto de estado que indica que ha ocurrido un error.
     */
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    /**
     * @function componentDidCatch
     * @description Captura información sobre el error.
     * @param {Error} error - El error que fue lanzado.
     * @param {object} errorInfo - Un objeto con una clave `componentStack` que contiene información sobre qué componente lanzó el error.
     */
    componentDidCatch(error, errorInfo) {
        console.error('Error capturado por ErrorBoundary:', error, errorInfo);
        this.setState({ error });
    }

    /**
     * @function handleReload
     * @description Recarga la página para intentar resolver el error.
     */
    handleReload = () => {
        window.location.href = '/';
    };

    /**
     * @function render
     * @description Renderiza el componente. Muestra la UI de fallback si hay un error, o los componentes hijos si no lo hay.
     * @returns {React.ReactNode}
     */
    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😔</div>
                        <h1 style={{
                            color: '#1e293b',
                            fontSize: '1.875rem',
                            marginBottom: '1rem'
                        }}>
                            Algo salió mal
                        </h1>
                        <p style={{
                            color: '#64748b',
                            marginBottom: '2rem'
                        }}>
                            Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
                        </p>
                        <button
                            onClick={this.handleReload}
                            style={{
                                padding: '0.75rem 2rem',
                                background: '#4f46e5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    /** Los componentes hijos que este boundary va a envolver. */
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;
