/**
 * @file Componente para seleccionar emociones.
 * @description Permite a los usuarios seleccionar emociones y asignarles una intensidad, además de añadir un comentario.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/Slider
 * @requires ../atoms/Checkbox
 * @requires ../../styles/molecules/EmotionSelector.css
 */
import React from "react";
import PropTypes from "prop-types";
import Slider from "../atoms/Slider";
import Checkbox from "../atoms/Checkbox";
import "../../styles/molecules/EmotionSelector.css";

/**
 * @constant {string[]} EMOCIONES
 * @description Lista de emociones predefinidas.
 */
const EMOCIONES = [
    'Cambios de ánimo', 'Sin control', 'Bien', 'Feliz', 'Triste',
    'Sensible', 'Rabia', 'Seguridad', 'Entusiasmo', 'Irritabilidad',
    'Ansiedad', 'Inseguridad', 'Gratitud', 'Indiferencia'
];

/**
 * @function EmotionSelector
 * @description Un componente que permite a los usuarios seleccionar emociones, su intensidad y añadir un comentario.
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.emociones - La lista de emociones seleccionadas.
 * @param {function} props.onChange - Función que se llama cuando la selección de emociones cambia.
 * @param {string} props.comentario - El comentario adicional del usuario.
 * @param {function} props.onComentarioChange - Función que se llama cuando el comentario cambia.
 * @returns {JSX.Element} El componente selector de emociones.
 */
const EmotionSelector = ({ emociones, onChange, comentario, onComentarioChange }) => {
    /**
     * @function handleEmocionToggle
     * @description Añade o elimina una emoción de la selección.
     * @param {string} emocion - La emoción a alternar.
     */
    const handleEmocionToggle = (emocion) => {
        const existe = emociones.find(e => e.nombre === emocion);
        if (existe) {
            onChange(emociones.filter(e => e.nombre !== emocion));
        } else {
            onChange([...emociones, { nombre: emocion, intensidad: 5 }]);
        }
    };

    /**
     * @function handleIntensidadChange
     * @description Cambia la intensidad de una emoción seleccionada.
     * @param {string} emocion - La emoción a modificar.
     * @param {number} intensidad - El nuevo valor de intensidad.
     */
    const handleIntensidadChange = (emocion, intensidad) => {
        onChange(emociones.map(e =>
            e.nombre === emocion ? { ...e, intensidad } : e
        ));
    };

    /**
     * @function isSelected
     * @description Comprueba si una emoción está seleccionada.
     * @param {string} emocion - La emoción a comprobar.
     * @returns {boolean} `true` si está seleccionada, `false` en caso contrario.
     */
    const isSelected = (emocion) => emociones.some(e => e.nombre === emocion);

    /**
     * @function getIntensidad
     * @description Obtiene la intensidad de una emoción seleccionada.
     * @param {string} emocion - La emoción.
     * @returns {number} La intensidad de la emoción, o 5 por defecto.
     */
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
    /** La lista de emociones seleccionadas. */
    emociones: PropTypes.arrayOf(
        PropTypes.shape({
            /** El nombre de la emoción. */
            nombre: PropTypes.string.isRequired,
            /** La intensidad de la emoción. */
            intensidad: PropTypes.number.isRequired
        })
    ).isRequired,
    /** Función que se llama cuando la selección de emociones cambia. */
    onChange: PropTypes.func.isRequired,
    /** El comentario adicional del usuario. */
    comentario: PropTypes.string,
    /** Función que se llama cuando el comentario cambia. */
    onComentarioChange: PropTypes.func.isRequired
};

export default EmotionSelector;
