/**
 * @file Componente para seleccionar aspectos cognitivos.
 * @description Permite a los usuarios seleccionar diferentes aspectos cognitivos y asignarles una intensidad.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/Slider
 * @requires ../atoms/Checkbox
 * @requires ../../styles/molecules/CognitionSelector.css
 */
import React from "react";
import PropTypes from "prop-types";
import Slider from "../atoms/Slider";
import Checkbox from "../atoms/Checkbox";
import "../../styles/molecules/CognitionSelector.css";

/**
 * @constant {string[]} ASPECTOS_COGNITIVOS
 * @description Lista de aspectos cognitivos predefinidos.
 */
const ASPECTOS_COGNITIVOS = [
    'Poca memoria', 'Niebla mental', 'Tranquilidad', 'Estrés',
    'Concentración', 'Distracción', 'Motivación', 'Sin motivación',
    'Creatividad', 'Alto rendimiento', 'Bajo rendimiento'
];

/**
 * @function CognitionSelector
 * @description Un componente que permite a los usuarios seleccionar aspectos cognitivos y su intensidad.
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.cognicion - La lista de aspectos cognitivos seleccionados.
 * @param {function} props.onChange - Función que se llama cuando la selección cambia.
 * @returns {JSX.Element} El componente selector de cognición.
 */
const CognitionSelector = ({ cognicion, onChange }) => {
    /**
     * @function handleToggle
     * @description Añade o elimina un aspecto cognitivo de la selección.
     * @param {string} aspecto - El aspecto cognitivo a alternar.
     */
    const handleToggle = (aspecto) => {
        const existe = cognicion.find(c => c.nombre === aspecto);
        if (existe) {
            onChange(cognicion.filter(c => c.nombre !== aspecto));
        } else {
            onChange([...cognicion, { nombre: aspecto, intensidad: 5 }]);
        }
    };

    /**
     * @function handleIntensidadChange
     * @description Cambia la intensidad de un aspecto cognitivo seleccionado.
     * @param {string} aspecto - El aspecto cognitivo a modificar.
     * @param {number} intensidad - El nuevo valor de intensidad.
     */
    const handleIntensidadChange = (aspecto, intensidad) => {
        onChange(cognicion.map(c => 
            c.nombre === aspecto ? { ...c, intensidad } : c
        ));
    };

    /**
     * @function isSelected
     * @description Comprueba si un aspecto cognitivo está seleccionado.
     * @param {string} aspecto - El aspecto cognitivo a comprobar.
     * @returns {boolean} `true` si está seleccionado, `false` en caso contrario.
     */
    const isSelected = (aspecto) => cognicion.some(c => c.nombre === aspecto);

    /**
     * @function getIntensidad
     * @description Obtiene la intensidad de un aspecto cognitivo seleccionado.
     * @param {string} aspecto - El aspecto cognitivo.
     * @returns {number} La intensidad del aspecto, o 5 por defecto.
     */
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
    /** La lista de aspectos cognitivos seleccionados. */
    cognicion: PropTypes.arrayOf(
        PropTypes.shape({
            /** El nombre del aspecto cognitivo. */
            nombre: PropTypes.string.isRequired,
            /** La intensidad del aspecto cognitivo. */
            intensidad: PropTypes.number.isRequired
        })
    ).isRequired,
    /** Función que se llama cuando la selección cambia. */
    onChange: PropTypes.func.isRequired
};

export default CognitionSelector;
