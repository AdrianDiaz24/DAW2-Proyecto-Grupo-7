import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary - Componente para capturar errores de React
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error capturado por ErrorBoundary:', error, errorInfo);
        this.setState({ error });
    }

    handleReload = () => {
        window.location.href = '/';
    };

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
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;

