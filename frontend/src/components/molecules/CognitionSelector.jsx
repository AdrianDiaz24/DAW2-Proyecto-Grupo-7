import React from "react";
import PropTypes from "prop-types";
import Slider from "../atoms/Slider";
import Checkbox from "../atoms/Checkbox";
import "../../styles/molecules/CognitionSelector.css";
const ASPECTOS_COGNITIVOS = [
    'Poca memoria', 'Niebla mental', 'Tranquilidad', 'Estrés',
    'Concentración', 'Distracción', 'Motivación', 'Sin motivación',
    'Creatividad', 'Alto rendimiento', 'Bajo rendimiento'
];
const CognitionSelector = ({ cognicion, onChange }) => {
    const handleToggle = (aspecto) => {
        const existe = cognicion.find(c => c.nombre === aspecto);
        if (existe) {
            onChange(cognicion.filter(c => c.nombre !== aspecto));
        } else {
            onChange([...cognicion, { nombre: aspecto, intensidad: 5 }]);
        }
    };
    const handleIntensidadChange = (aspecto, intensidad) => {
        onChange(cognicion.map(c => 
            c.nombre === aspecto ? { ...c, intensidad } : c
        ));
    };
    const isSelected = (aspecto) => cognicion.some(c => c.nombre === aspecto);
    const getIntensidad = (aspecto) => cognicion.find(c => c.nombre === aspecto)?.intensidad || 5;
    return (
        <div className="cognition-selector">
            <h3>Cognición y Estado Mental</h3>
            <p className="cognition-selector__description">
                Selecciona los aspectos cognitivos que has experimentado hoy
            </p>
            <div className="cognition-selector__grid">
                {ASPECTOS_COGNITIVOS.map((aspecto) => (
                    <div key={aspecto} className="cognition-selector__item">
                        <Checkbox
                            label={aspecto}
                            checked={isSelected(aspecto)}
                            onChange={() => handleToggle(aspecto)}
                        />
                        {isSelected(aspecto) && (
                            <Slider
                                label="Intensidad"
                                value={getIntensidad(aspecto)}
                                onChange={(value) => handleIntensidadChange(aspecto, value)}
                                min={1}
                                max={10}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
CognitionSelector.propTypes = {
    cognicion: PropTypes.arrayOf(
        PropTypes.shape({
            nombre: PropTypes.string.isRequired,
            intensidad: PropTypes.number.isRequired
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired
};
export default CognitionSelector;
