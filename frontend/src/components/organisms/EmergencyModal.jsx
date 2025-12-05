/**
 * @file Modal de emergencia.
 * @description Este componente muestra un modal con opciones de emergencia, incluyendo información, contactos y llamadas.
 * @requires react
 * @requires ../../service/contactoEmergencia.service
 */
import React, { useState, useEffect } from 'react';
import { contactoEmergenciaService } from '../../service/contactoEmergencia.service';
import '../../styles/organisms/EmergencyModal.css';

/**
 * @function EmergencyModal
 * @description Componente que renderiza un modal con pestañas para información de emergencia, contactos y opciones de llamada.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element} El componente del modal de emergencia.
 */
const EmergencyModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newContact, setNewContact] = useState({
        nombre: '',
        telefono: '',
        email: '',
        relacion: ''
    });

    /**
     * @function loadContacts
     * @description Carga los contactos de emergencia desde la API.
     */
    const loadContacts = () => {
        setLoading(true);
        contactoEmergenciaService.getAll()
            .then(data => {
                setContacts(data || []);
            })
            .catch(err => {
                console.error('Error al cargar contactos:', err);
                setContacts([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (activeTab === 'contacts') {
            loadContacts();
        }
    }, [activeTab]);

    /**
     * @function isMobileDevice
     * @description Detecta si el usuario está en un dispositivo móvil.
     * @returns {boolean}
     */
    const isMobileDevice = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    /**
     * @function handleCall
     * @description Inicia una llamada telefónica si el dispositivo es móvil, de lo contrario muestra una alerta.
     * @param {string} number - El número de teléfono a llamar.
     */
    const handleCall = (number) => {
        if (isMobileDevice()) {
            window.location.href = `tel:${number}`;
        } else {
            alert(`Por favor, llama al ${number} desde tu teléfono móvil.`);
        }
    };

    /**
     * @function handleSendEmail
     * @description Envía un email de emergencia a través del backend.
     * @param {string} contactoId - El ID del contacto de emergencia.
     * @param {string} email - La dirección de correo electrónico del destinatario (para mostrar en mensajes).
     */
    const handleSendEmail = async (contactoId, email) => {
        try {
            await contactoEmergenciaService.sendEmergencyEmail(contactoId);
            alert(`Email de emergencia enviado correctamente a ${email}`);
        } catch (error) {
            console.error('Error al enviar email:', error);
            alert('Error al enviar el email. Por favor, inténtalo de nuevo o contacta directamente.');
        }
    };

    /**
     * @function handleSendSms
     * @description Inicia el envío de un SMS si el dispositivo es móvil, de lo contrario muestra una alerta.
     * @param {string} phone - El número de teléfono para enviar el SMS.
     */
    const handleSendSms = (phone) => {
        if (isMobileDevice()) {
            window.location.href = `sms:${phone}?body=Hola, necesito ayuda. Por favor, llámame lo antes posible.`;
        } else {
            alert(`Por favor, envía un SMS a ${phone} desde tu teléfono móvil.`);
        }
    };

    /**
     * @function handleOverlayClick
     * @description Cierra el modal si se hace clic en el overlay.
     * @param {Event} e - El evento de clic.
     */
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    /**
     * @function handleInputChange
     * @description Maneja los cambios en los inputs del formulario.
     * @param {Event} e - El evento de cambio.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * @function handleAddContact
     * @description Añade un nuevo contacto de emergencia.
     * @param {Event} e - El evento de submit.
     */
    const handleAddContact = async (e) => {
        e.preventDefault();

        if (!newContact.nombre || !newContact.telefono) {
            alert('Por favor, completa al menos el nombre y el teléfono.');
            return;
        }

        setSaving(true);
        try {
            await contactoEmergenciaService.create(newContact);
            setNewContact({ nombre: '', telefono: '', email: '', relacion: '' });
            setShowAddForm(false);
            loadContacts();
        } catch (error) {
            console.error('Error al crear contacto:', error);
            alert('Error al crear el contacto. Por favor, inténtalo de nuevo.');
        } finally {
            setSaving(false);
        }
    };

    /**
     * @function handleCancelAdd
     * @description Cancela la adición de un nuevo contacto.
     */
    const handleCancelAdd = () => {
        setShowAddForm(false);
        setNewContact({ nombre: '', telefono: '', email: '', relacion: '' });
    };

    return (
        <div className="emergency-modal-overlay" onClick={handleOverlayClick}>
            <div className="emergency-modal">
                {/* Header */}
                <div className="emergency-modal__header">
                    <h2 className="emergency-modal__title">🆘 Emergencia</h2>
                    <button
                        className="emergency-modal__close"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </div>

                {/* Tabs */}
                <div className="emergency-modal__tabs">
                    <button
                        className={`emergency-modal__tab ${activeTab === 'info' ? 'emergency-modal__tab--active' : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        📋 Información
                    </button>
                    <button
                        className={`emergency-modal__tab ${activeTab === 'contacts' ? 'emergency-modal__tab--active' : ''}`}
                        onClick={() => setActiveTab('contacts')}
                    >
                        👥 Contactos
                    </button>
                    <button
                        className={`emergency-modal__tab ${activeTab === 'call' ? 'emergency-modal__tab--active' : ''}`}
                        onClick={() => setActiveTab('call')}
                    >
                        📞 Llamar
                    </button>
                </div>

                {/* Content */}
                <div className="emergency-modal__content">
                    {/* Pestaña de Información */}
                    {activeTab === 'info' && (
                        <div>
                            <h3 className="emergency-info__title">Protocolos de Emergencia</h3>
                            <p className="emergency-info__text">
                                En caso de una crisis de salud mental, sigue estos pasos:
                            </p>
                            <ul className="emergency-info__list">
                                <li>Busca un lugar seguro y tranquilo.</li>
                                <li>Intenta respirar lenta y profundamente.</li>
                                <li>Contacta a una de las personas de tu lista de emergencia.</li>
                                <li>Si estás en peligro inmediato, llama a los servicios de emergencia.</li>
                            </ul>

                            <h3 className="emergency-info__title">Números de Teléfono de Ayuda</h3>
                            <ul className="emergency-info__list">
                                <li>
                                    <span className="emergency-info__number">112:</span> Emergencias generales
                                </li>
                                <li>
                                    <span className="emergency-info__number">024:</span> Línea de atención a la conducta suicida
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Pestaña de Contactos */}
                    {activeTab === 'contacts' && (
                        <div>
                            <h3 className="emergency-info__title">Tus Contactos de Emergencia</h3>

                            {/* Botón para añadir contacto */}
                            {!showAddForm && (
                                <button
                                    className="emergency-contacts__add-btn"
                                    onClick={() => setShowAddForm(true)}
                                >
                                    ➕ Añadir contacto de emergencia
                                </button>
                            )}

                            {/* Formulario para añadir contacto */}
                            {showAddForm && (
                                <form className="emergency-contacts__form" onSubmit={handleAddContact}>
                                    <h4 className="emergency-contacts__form-title">Nuevo contacto</h4>

                                    <div className="emergency-contacts__form-group">
                                        <label className="emergency-contacts__form-label">Nombre *</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={newContact.nombre}
                                            onChange={handleInputChange}
                                            className="emergency-contacts__form-input"
                                            placeholder="Nombre del contacto"
                                            required
                                        />
                                    </div>

                                    <div className="emergency-contacts__form-group">
                                        <label className="emergency-contacts__form-label">Teléfono *</label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={newContact.telefono}
                                            onChange={handleInputChange}
                                            className="emergency-contacts__form-input"
                                            placeholder="Número de teléfono"
                                            required
                                        />
                                    </div>

                                    <div className="emergency-contacts__form-group">
                                        <label className="emergency-contacts__form-label">Email (opcional)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newContact.email}
                                            onChange={handleInputChange}
                                            className="emergency-contacts__form-input"
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>

                                    <div className="emergency-contacts__form-group">
                                        <label className="emergency-contacts__form-label">Relación (opcional)</label>
                                        <input
                                            type="text"
                                            name="relacion"
                                            value={newContact.relacion}
                                            onChange={handleInputChange}
                                            className="emergency-contacts__form-input"
                                            placeholder="Ej: Familiar, Amigo, Terapeuta..."
                                        />
                                    </div>

                                    <div className="emergency-contacts__form-actions">
                                        <button
                                            type="submit"
                                            className="emergency-contacts__form-submit"
                                            disabled={saving}
                                        >
                                            {saving ? 'Guardando...' : 'Guardar contacto'}
                                        </button>
                                        <button
                                            type="button"
                                            className="emergency-contacts__form-cancel"
                                            onClick={handleCancelAdd}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Lista de contactos */}
                            {loading ? (
                                <p className="emergency-contacts__empty">Cargando contactos...</p>
                            ) : contacts.length > 0 ? (
                                <ul className="emergency-contacts__list">
                                    {contacts.map(contact => (
                                        <li key={contact._id} className="emergency-contacts__item">
                                            <div className="emergency-contacts__name">{contact.nombre}</div>
                                            {contact.relacion && (
                                                <div className="emergency-contacts__detail">Relación: {contact.relacion}</div>
                                            )}
                                            <div className="emergency-contacts__detail">📱 {contact.telefono}</div>
                                            {contact.email && (
                                                <div className="emergency-contacts__detail">✉️ {contact.email}</div>
                                            )}
                                            <div className="emergency-contacts__actions">
                                                <button
                                                    className="emergency-contacts__action-btn emergency-contacts__action-btn--call"
                                                    onClick={() => handleCall(contact.telefono)}
                                                >
                                                    📞 Llamar
                                                </button>
                                                {contact.email && (
                                                    <button
                                                        className="emergency-contacts__action-btn emergency-contacts__action-btn--email"
                                                        onClick={() => handleSendEmail(contact._id, contact.email)}
                                                    >
                                                        ✉️ Email
                                                    </button>
                                                )}
                                                <button
                                                    className="emergency-contacts__action-btn emergency-contacts__action-btn--sms"
                                                    onClick={() => handleSendSms(contact.telefono)}
                                                >
                                                    💬 SMS
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="emergency-contacts__empty">
                                    No tienes contactos de emergencia guardados. ¡Añade uno arriba!
                                </p>
                            )}
                        </div>
                    )}

                    {/* Pestaña de Llamar */}
                    {activeTab === 'call' && (
                        <div>
                            <h3 className="emergency-info__title">Llamar a Servicios de Emergencia</h3>
                            <p className="emergency-call__text">
                                Si te encuentras en una situación de crisis, no dudes en llamar a los servicios de emergencia.
                            </p>
                            <div className="emergency-call__buttons">
                                <button
                                    className="emergency-call__btn emergency-call__btn--112"
                                    onClick={() => handleCall('112')}
                                >
                                    🚨 Llamar al 112 (Emergencias)
                                </button>
                                <button
                                    className="emergency-call__btn emergency-call__btn--024"
                                    onClick={() => handleCall('024')}
                                >
                                    💛 Llamar al 024 (Atención suicida)
                                </button>
                            </div>
                            {!isMobileDevice() && (
                                <div className="emergency-call__note">
                                    ⚠️ Estás usando un ordenador. Si no puedes realizar la llamada directamente,
                                    por favor utiliza tu teléfono móvil para contactar con estos servicios.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmergencyModal;
