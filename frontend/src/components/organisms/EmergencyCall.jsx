import React from 'react';

const EmergencyCall = () => {
    const handleCall = (number) => {
        try {
            window.location.href = `tel:${number}`;
        } catch (e) {
            alert(`No se puede realizar la llamada desde este dispositivo. Por favor, llama manualmente al ${number}.`);
        }
    };

    return (
        <div>
            <h3>Llamar a Emergencias</h3>
            <p>Si te encuentras en una situación de crisis, no dudes en llamar a los servicios de emergencia.</p>
            <button onClick={() => handleCall('112')}>Llamar al 112</button>
            <button onClick={() => handleCall('024')}>Llamar al 024 (Línea de atención a la conducta suicida)</button>
            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                Si estás en un ordenador, es posible que no puedas realizar la llamada directamente. En ese caso, por favor, utiliza tu teléfono.
            </p>
        </div>
    );
};

export default EmergencyCall;

