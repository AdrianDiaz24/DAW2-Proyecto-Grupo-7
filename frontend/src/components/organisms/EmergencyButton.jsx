import React, { useState } from 'react';
import EmergencyModal from './EmergencyModal';
import './EmergencyButton.css';

const EmergencyButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <button onClick={openModal} className="emergency-button">
                SOS
            </button>
            {modalOpen && <EmergencyModal closeModal={closeModal} />}
        </>
    );
};

export default EmergencyButton;

