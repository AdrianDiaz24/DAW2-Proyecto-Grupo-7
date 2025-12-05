import React, { useState, useEffect } from 'react';
import { contactoEmergenciaService } from '../../service/contactoEmergencia.service';

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await contactoEmergenciaService.getAll();
                setContacts(response);
            } catch (err) {
                setError('No se pudieron cargar los contactos de emergencia.');
                console.error(err);
            }
        };

        fetchContacts();
    }, []);

    const handleEmail = (email) => {
        window.location.href = `mailto:${email}?subject=Ayuda Urgente&body=Hola, necesito que me llames lo antes posible. Es urgente.`;
    };

    const handleSMS = (phone) => {
        const message = "Hola, necesito que me llames lo antes posible. Es urgente.";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `sms:${phone}&body=${encodeURIComponent(message)}`;
        } else {
            alert("Esta función solo está disponible en dispositivos móviles.");
        }
    };

    const handleCall = (phone) => {
        try {
            window.location.href = `tel:${phone}`;
        } catch (e) {
            alert('No se puede realizar la llamada desde este dispositivo. Por favor, llama manualmente.');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (contacts.length === 0) {
        return <p>No tienes contactos de emergencia guardados.</p>;
    }

    return (
        <div>
            <h3>Contactos de Emergencia</h3>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact._id}>
                        <strong>{contact.nombre}</strong>
                        <p>Teléfono: {contact.telefono}</p>
                        {contact.email && <p>Email: {contact.email}</p>}
                        <button onClick={() => handleCall(contact.telefono)}>Llamar</button>
                        <button onClick={() => handleSMS(contact.telefono)}>Enviar SMS</button>
                        {contact.email && <button onClick={() => handleEmail(contact.email)}>Enviar Email</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmergencyContacts;

