import React from "react";
import PropTypes from "prop-types";
import Slider from "../atoms/Slider";
import Checkbox from "../atoms/Checkbox";
import "../../styles/molecules/EmotionSelector.css";

const EMOCIONES = [
    'Cambios de ánimo', 'Sin control', 'Bien', 'Feliz', 'Triste',
    'Sensible', 'Rabia', 'Seguridad', 'Entusiasmo', 'Irritabilidad',
    'Ansiedad', 'Inseguridad', 'Gratitud', 'Indiferencia'
];

const EmotionSelector = ({ emociones, onChange, comentario, onComentarioChange }) => {
    const handleEmocionToggle = (emocion) => {
        const existe = emociones.find(e => e.nombre === emocion);
        if (existe) {
            onChange(emociones.filter(e => e.nombre !== emocion));
        } else {
            onChange([...emociones, { nombre: emocion, intensidad: 5 }]);
        }
    };

    const handleIntensidadChange = (emocion, intensidad) => {
        onChange(emociones.map(e =>
            e.nombre === emocion ? { ...e, intensidad } : e
        ));
    };

    const isSelected = (emocion) => emociones.some(e => e.nombre === emocion);
    const getIntensidad = (emocion) => emociones.find(e => e.nombre === emocion)?.intensidad || 5;

    return (
        <div className="emotion-selector">
            <h3>Estado de Ánimo</h3>
            <p className="emotion-selector__description">
                Selecciona las emociones que has experimentado hoy
            </p>

            <div className="emotion-selector__grid">
                {EMOCIONES.map((emocion) => (
                    <div key={emocion} className="emotion-selector__item">
                        <Checkbox
                            label={emocion}
                            checked={isSelected(emocion)}
                            onChange={() => handleEmocionToggle(emocion)}
                        />
                        {isSelected(emocion) && (
                            <Slider
                                label="Intensidad"
                                value={getIntensidad(emocion)}
                                onChange={(value) => handleIntensidadChange(emocion, value)}
                                min={1}
                                max={10}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="emotion-selector__comment">
                <label>Comentario adicional (opcional)</label>
                <textarea
                    value={comentario}
                    onChange={(e) => onComentarioChange(e.target.value)}
                    placeholder="¿Algo más que quieras añadir sobre tu estado de ánimo?"
                    rows={4}
                />
            </div>
        </div>
    );
};

EmotionSelector.propTypes = {
    emociones: PropTypes.arrayOf(
        PropTypes.shape({
            nombre: PropTypes.string.isRequired,
            intensidad: PropTypes.number.isRequired
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    comentario: PropTypes.string,
    onComentarioChange: PropTypes.func.isRequired
};

export default EmotionSelector;

