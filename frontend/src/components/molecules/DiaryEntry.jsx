import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils';
import '../../styles/molecules/DiaryEntry.css';

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

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

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
    entry: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        titulo: PropTypes.string.isRequired,
        cuerpo: PropTypes.string.isRequired,
        password: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    isOwner: PropTypes.bool
};

export default DiaryEntry;

