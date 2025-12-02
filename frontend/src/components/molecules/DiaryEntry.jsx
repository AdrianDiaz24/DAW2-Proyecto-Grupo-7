/**
 * @file Componente para mostrar una entrada del diario.
 * @description Muestra el contenido de una entrada del diario con opciones para editar, eliminar y compartir.
 * @requires react
 * @requires prop-types
 * @requires ../../utils
 * @requires ../../styles/molecules/DiaryEntry.css
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils';
import '../../styles/molecules/DiaryEntry.css';

/**
 * @function DiaryEntry
 * @description Renderiza una única entrada del diario.
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.entry - El objeto de la entrada del diario.
 * @param {function} props.onEdit - Función que se llama al hacer clic en editar.
 * @param {function} props.onDelete - Función que se llama al hacer clic en eliminar.
 * @param {function} props.onShare - Función que se llama al hacer clic en compartir.
 * @param {boolean} [props.isOwner=true] - Si es `true`, muestra los controles de propietario (editar, eliminar).
 * @returns {JSX.Element} El componente de la entrada del diario.
 */
const DiaryEntry = ({
    entry,
    onEdit,
    onDelete,
    onShare,
    isOwner = true
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxPreviewLength = 200;
    const isLong = entry.cuerpo.length > maxPreviewLength;

    /**
     * @function handleToggleExpand
     * @description Expande o contrae el cuerpo de la entrada del diario.
     */
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    /**
     * @function getPreviewText
     * @description Devuelve el texto completo o una vista previa del cuerpo de la entrada.
     * @returns {string} El texto a mostrar.
     */
    const getPreviewText = () => {
        if (isExpanded || !isLong) {
            return entry.cuerpo;
        }
        return entry.cuerpo.substring(0, maxPreviewLength) + '...';
    };

    return (
        <div className="diary-entry">
            <div className="diary-entry__header">
                <div className="diary-entry__header-left">
                    <h3 className="diary-entry__title">{entry.titulo}</h3>
                    <div className="diary-entry__meta">
                        <span className="diary-entry__date">
                            📅 {formatDate(entry.createdAt)}
                        </span>
                        {entry.password && (
                            <span className="diary-entry__protected">
                                🔒 Protegida
                            </span>
                        )}
                    </div>
                </div>
                {isOwner && (
                    <div className="diary-entry__actions">
                        {entry.password && (
                            <button
                                className="diary-entry__action diary-entry__action--share"
                                onClick={() => onShare(entry)}
                                title="Compartir"
                            >
                                🔗
                            </button>
                        )}
                        <button
                            className="diary-entry__action diary-entry__action--edit"
                            onClick={() => onEdit(entry)}
                            title="Editar"
                        >
                            ✏️
                        </button>
                        <button
                            className="diary-entry__action diary-entry__action--delete"
                            onClick={() => onDelete(entry._id)}
                            title="Eliminar"
                        >
                            🗑️
                        </button>
                    </div>
                )}
            </div>

            <div className="diary-entry__content">
                <p className="diary-entry__body">
                    {getPreviewText()}
                </p>
                {isLong && (
                    <button
                        className="diary-entry__toggle"
                        onClick={handleToggleExpand}
                    >
                        {isExpanded ? 'Ver menos' : 'Ver más'}
                    </button>
                )}
            </div>

            {entry.updatedAt !== entry.createdAt && (
                <div className="diary-entry__footer">
                    <span className="diary-entry__edited">
                        Editada el {formatDate(entry.updatedAt)}
                    </span>
                </div>
            )}
        </div>
    );
};

DiaryEntry.propTypes = {
    /** El objeto de la entrada del diario. */
    entry: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        titulo: PropTypes.string.isRequired,
        cuerpo: PropTypes.string.isRequired,
        password: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
    }).isRequired,
    /** Función que se llama al hacer clic en editar. */
    onEdit: PropTypes.func.isRequired,
    /** Función que se llama al hacer clic en eliminar. */
    onDelete: PropTypes.func.isRequired,
    /** Función que se llama al hacer clic en compartir. */
    onShare: PropTypes.func.isRequired,
    /** Si es `true`, muestra los controles de propietario (editar, eliminar). */
    isOwner: PropTypes.bool
};

export default DiaryEntry;
