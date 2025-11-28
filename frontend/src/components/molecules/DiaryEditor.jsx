import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Button from '../atoms/Button';
import { useToast } from '../../hooks';
import '../../styles/molecules/DiaryEditor.css';

const DiaryEditor = ({ onSave, onCancel, initialData = null, isLoading = false }) => {
    const { error: showError } = useToast();
    const [formData, setFormData] = useState({
        titulo: initialData?.titulo || '',
        cuerpo: initialData?.cuerpo || '',
        password: initialData?.password || '',
        showPassword: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (!formData.titulo.trim()) {
            showError('El título es requerido');
            return;
        }

        if (!formData.cuerpo.trim()) {
            showError('El contenido es requerido');
            return;
        }

        // Preparar datos para enviar
        const dataToSend = {
            titulo: formData.titulo.trim(),
            cuerpo: formData.cuerpo.trim()
        };

        // Solo incluir password si se proporcionó
        if (formData.password.trim()) {
            dataToSend.password = formData.password;
        }

        onSave(dataToSend);
    };

    const togglePasswordField = () => {
        setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    return (
        <div className="diary-editor">
            <div className="diary-editor__header">
                <h2>{initialData ? 'Editar entrada' : 'Nueva entrada de diario'}</h2>
                <p className="diary-editor__description">
                    {initialData
                        ? 'Modifica tu entrada del diario'
                        : 'Escribe tus pensamientos, sentimientos y experiencias del día'
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit} className="diary-editor__form">
                <Input
                    type="text"
                    name="titulo"
                    label="Título"
                    placeholder="Ej: Un día especial, Reflexiones de hoy..."
                    value={formData.titulo}
                    onChange={handleChange}
                    icon="📝"
                    disabled={isLoading}
                />

                <Textarea
                    name="cuerpo"
                    placeholder="Escribe aquí tu entrada del diario... Expresa libremente lo que piensas y sientes."
                    value={formData.cuerpo}
                    onChange={handleChange}
                    rows={12}
                    maxLength={5000}
                    disabled={isLoading}
                />

                <div className="diary-editor__password-section">
                    <div className="diary-editor__password-header">
                        <label className="diary-editor__checkbox">
                            <input
                                type="checkbox"
                                checked={formData.showPassword}
                                onChange={togglePasswordField}
                                disabled={isLoading}
                            />
                            <span>🔒 Proteger con contraseña (opcional)</span>
                        </label>
                        <p className="diary-editor__password-hint">
                            Permite compartir esta entrada con otras personas mediante una contraseña
                        </p>
                    </div>

                    {formData.showPassword && (
                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña para compartir"
                            value={formData.password}
                            onChange={handleChange}
                            icon="🔑"
                            disabled={isLoading}
                        />
                    )}
                </div>

                <div className="diary-editor__actions">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {initialData ? 'Guardar cambios' : 'Crear entrada'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

DiaryEditor.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        titulo: PropTypes.string,
        cuerpo: PropTypes.string,
        password: PropTypes.string
    }),
    isLoading: PropTypes.bool
};

export default DiaryEditor;

