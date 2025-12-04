import React from 'react';

const EmergencyInfo = () => {
    return (
        <div>
            <h3>Información de Emergencia</h3>
            <p>En caso de una crisis de salud mental, aquí tienes algunos recursos que pueden ayudarte:</p>
            <ul>
                <li><strong>Llama al 112:</strong> Servicio de emergencias general.</li>
                <li><strong>Llama al 024:</strong> Línea de atención a la conducta suicida.</li>
                <li>Contacta a un amigo o familiar de confianza.</li>
                <li>Busca un lugar seguro y tranquilo.</li>
            </ul>
            <h4>Protocolos de Actuación:</h4>
            <ol>
                <li><strong>Evalúa la situación:</strong> ¿Estás en peligro inmediato? Si es así, llama a emergencias.</li>
                <li><strong>Comunícate:</strong> Habla con alguien sobre lo que estás sintiendo.</li>
                <li><strong>Utiliza técnicas de relajación:</strong> Respiración profunda, meditación, etc.</li>
                <li><strong>Sigue tu plan de seguridad:</strong> Si tienes uno, ahora es el momento de usarlo.</li>
            </ol>
        </div>
    );
};

export default EmergencyInfo;

