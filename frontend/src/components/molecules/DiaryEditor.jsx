/**
 * @file Editor para crear o modificar entradas del diario.
 * @description Un formulario completo para escribir, guardar y opcionalmente proteger con contraseña las entradas del diario.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/Input
 * @requires ../atoms/Textarea
 * @requires ../atoms/Button
 * @requires ../../hooks
 * @requires ../../styles/molecules/DiaryEditor.css
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Button from '../atoms/Button';
import { useToast } from '../../hooks';
import '../../styles/molecules/DiaryEditor.css';

/**
 * @function DiaryEditor
 * @description Renderiza un formulario para crear o editar una entrada del diario.
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onSave - Función que se llama al guardar la entrada.
 * @param {function} props.onCancel - Función que se llama al cancelar la edición.
 * @param {object} [props.initialData=null] - Los datos iniciales para editar una entrada existente.
 * @param {boolean} [props.isLoading=false] - Si es `true`, muestra un estado de carga.
 * @returns {JSX.Element} El componente del editor del diario.
 */
const DiaryEditor = ({ onSave, onCancel, initialData = null, isLoading = false }) => {
    const { error: showError } = useToast();
    const [formData, setFormData] = useState({
        titulo: initialData?.titulo || '',
        cuerpo: initialData?.cuerpo || '',
        password: initialData?.password || '',
        showPassword: false
    });

    /**
     * @function handleChange
     * @description Actualiza el estado del formulario cuando cambian los campos de entrada.
     * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - El evento de cambio.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * @function handleSubmit
     * @description Valida y envía los datos del formulario al guardar.
     * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
     */
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

    /**
     * @function togglePasswordField
     * @description Muestra u oculta el campo de la contraseña.
     */
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
    /** Función que se llama al guardar la entrada. */
    onSave: PropTypes.func.isRequired,
    /** Función que se llama al cancelar la edición. */
    onCancel: PropTypes.func.isRequired,
    /** Los datos iniciales para editar una entrada existente. */
    initialData: PropTypes.shape({
        titulo: PropTypes.string,
        cuerpo: PropTypes.string,
        password: PropTypes.string
    }),
    /** Si es `true`, muestra un estado de carga. */
    isLoading: PropTypes.bool
};

export default DiaryEditor;
