import React, { useState, useEffect } from "react";
import { useToast } from "../hooks";
import { diarioService } from "../service/diario.service";
import DiaryEditor from "../components/molecules/DiaryEditor";
import DiaryEntry from "../components/molecules/DiaryEntry";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import "../styles/Diario.css";

const Diario = () => {
    const { success: showSuccess, error: showError } = useToast();
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [shareModal, setShareModal] = useState(null);

    // Cargar entradas al montar
    useEffect(() => {
        loadEntries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadEntries = async () => {
        setIsLoading(true);
        try {
            const data = await diarioService.getAll();
            setEntries(data);
        } catch (error) {
            showError(error.message || 'Error al cargar las entradas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateEntry = async (entryData) => {
        setIsLoading(true);
        try {
            const newEntry = await diarioService.create(entryData);
            showSuccess('¡Entrada creada exitosamente!');
            setEntries([newEntry.entrada, ...entries]);
            setShowEditor(false);
        } catch (error) {
            showError(error.message || 'Error al crear la entrada');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateEntry = async (entryData) => {
        setIsLoading(true);
        try {
            const updated = await diarioService.update(editingEntry._id, entryData);
            showSuccess('¡Entrada actualizada exitosamente!');
            setEntries(entries.map(e => e._id === editingEntry._id ? updated.entrada : e));
            setShowEditor(false);
            setEditingEntry(null);
        } catch (error) {
            showError(error.message || 'Error al actualizar la entrada');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEntry = async (entryId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta entrada? Esta acción no se puede deshacer.')) {
            return;
        }

        setIsLoading(true);
        try {
            await diarioService.delete(entryId);
            showSuccess('Entrada eliminada exitosamente');
            setEntries(entries.filter(e => e._id !== entryId));
        } catch (error) {
            showError(error.message || 'Error al eliminar la entrada');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setShowEditor(true);
    };

    const handleCancelEditor = () => {
        setShowEditor(false);
        setEditingEntry(null);
    };

    const handleShareEntry = (entry) => {
        setShareModal(entry);
    };

    const copyShareLink = () => {
        const url = `${window.location.origin}/diario/${shareModal._id}`;
        navigator.clipboard.writeText(url);
        showSuccess('¡Link copiado al portapapeles!');
    };

    const closeShareModal = () => {
        setShareModal(null);
    };

    return (
        <div className="diario-page">
            <div className="diario-container">
                {!showEditor ? (
                    <>
                        {/* Header */}
                        <div className="diario-header">
                            <div className="diario-header__text">
                                <h1>Mi Diario Personal</h1>
                                <p>Un espacio privado para tus pensamientos, reflexiones y experiencias</p>
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => setShowEditor(true)}
                                disabled={isLoading}
                            >
                                Nueva entrada
                            </Button>
                        </div>

                        {/* Lista de entradas */}
                        <div className="diario-content">
                            {isLoading && entries.length === 0 ? (
                                <div className="diario-loading">
                                    <div className="spinner"></div>
                                    <p>Cargando tus entradas...</p>
                                </div>
                            ) : entries.length === 0 ? (
                                <div className="diario-empty">
                                    <div className="diario-empty__icon">📝</div>
                                    <h2>Tu diario está vacío</h2>
                                    <p>Comienza a escribir tu primera entrada y lleva un registro de tus experiencias diarias</p>
                                    <Button
                                        variant="primary"
                                        onClick={() => setShowEditor(true)}
                                    >
                                        Crear primera entrada
                                    </Button>
                                </div>
                            ) : (
                                <div className="diario-entries">
                                    {entries.map(entry => (
                                        <DiaryEntry
                                            key={entry._id}
                                            entry={entry}
                                            onEdit={handleEditEntry}
                                            onDelete={handleDeleteEntry}
                                            onShare={handleShareEntry}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <DiaryEditor
                        onSave={editingEntry ? handleUpdateEntry : handleCreateEntry}
                        onCancel={handleCancelEditor}
                        initialData={editingEntry}
                        isLoading={isLoading}
                    />
                )}

                {/* Modal de compartir */}
                {shareModal && (
                    <div className="modal-overlay" onClick={closeShareModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>🔗 Compartir entrada</h2>
                                <button className="modal-close" onClick={closeShareModal}>×</button>
                            </div>
                            <div className="modal-body">
                                <p className="modal-description">
                                    Comparte este link con quien quieras darle acceso a esta entrada.
                                    Necesitarán la contraseña que configuraste.
                                </p>
                                <div className="share-link-container">
                                    <Input
                                        value={`${window.location.origin}/diario/${shareModal._id}`}
                                        onChange={() => {}} // Read-only input
                                        icon="🔗"
                                    />
                                    <Button variant="primary" onClick={copyShareLink}>
                                        Copiar
                                    </Button>
                                </div>
                                <div className="share-info">
                                    <p>💡 <strong>Recuerda:</strong> La persona necesitará la contraseña que configuraste para acceder.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Diario;

