/**
 * @file Página del Diario.
 * @description Permite a los usuarios crear, ver, editar, eliminar y compartir entradas de su diario personal.
 * @requires react
 * @requires ../hooks
 * @requires ../service/diario.service
 * @requires ../components/molecules/DiaryEditor
 * @requires ../components/molecules/DiaryEntry
 * @requires ../components/atoms/Button
 * @requires ../components/atoms/Input
 * @requires ../styles/Diario.css
 */
import React, { useState, useEffect } from "react";
import { useToast } from "../hooks";
import { diarioService } from "../service/diario.service";
import DiaryEditor from "../components/molecules/DiaryEditor";
import DiaryEntry from "../components/molecules/DiaryEntry";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import "../styles/Diario.css";

/**
 * @function Diario
 * @description Componente principal de la página del diario. Gestiona el estado y la lógica para las entradas del diario.
 * @returns {JSX.Element} La página del diario.
 */
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

    /**
     * @function loadEntries
     * @description Carga todas las entradas del diario del usuario desde el servicio.
     * @async
     */
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

    /**
     * @function handleCreateEntry
     * @description Maneja la creación de una nueva entrada del diario.
     * @param {object} entryData - Los datos de la nueva entrada.
     * @async
     */
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

    /**
     * @function handleUpdateEntry
     * @description Maneja la actualización de una entrada existente.
     * @param {object} entryData - Los nuevos datos para la entrada.
     * @async
     */
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

    /**
     * @function handleDeleteEntry
     * @description Maneja la eliminación de una entrada.
     * @param {string} entryId - El ID de la entrada a eliminar.
     * @async
     */
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

    /**
     * @function handleEditEntry
     * @description Prepara el editor para modificar una entrada existente.
     * @param {object} entry - La entrada a editar.
     */
    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setShowEditor(true);
    };

    /**
     * @function handleCancelEditor
     * @description Cancela la edición y cierra el editor.
     */
    const handleCancelEditor = () => {
        setShowEditor(false);
        setEditingEntry(null);
    };

    /**
     * @function handleShareEntry
     * @description Abre el modal para compartir una entrada.
     * @param {object} entry - La entrada a compartir.
     */
    const handleShareEntry = (entry) => {
        setShareModal(entry);
    };

    /**
     * @function copyShareLink
     * @description Copia el enlace para compartir al portapapeles.
     */
    const copyShareLink = () => {
        const url = `${window.location.origin}/diario/${shareModal._id}`;
        navigator.clipboard.writeText(url);
        showSuccess('¡Link copiado al portapapeles!');
    };

    /**
     * @function closeShareModal
     * @description Cierra el modal de compartir.
     */
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
