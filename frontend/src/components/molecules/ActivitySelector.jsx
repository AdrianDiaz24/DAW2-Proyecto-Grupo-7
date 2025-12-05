/**
 * @file Componente para seleccionar y registrar actividades físicas.
 * @description Permite a los usuarios añadir actividades de una lista, especificar duración e intensidad, y ver las actividades registradas.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/Button
 * @requires ../../styles/molecules/ActivitySelector.css
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../atoms/Button";
import "../../styles/molecules/ActivitySelector.css";

/**
 * @constant {string[]} ACTIVIDADES
 * @description Lista de actividades físicas predefinidas.
 */
const ACTIVIDADES = [
    'Correr', 'Natación', 'Yoga', 'Ciclismo', 'Caminar',
    'Pilates', 'Entrenamiento de fuerza', 'Estiramiento', 
    'Kegels', 'Día de reposo'
];

/**
 * @function ActivitySelector
 * @description Un componente que permite a los usuarios seleccionar, añadir y eliminar actividades físicas.
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.actividades - La lista de actividades ya registradas.
 * @param {function} props.onChange - Función que se llama cuando la lista de actividades cambia.
 * @returns {JSX.Element} El componente selector de actividades.
 */
const ActivitySelector = ({ actividades, onChange }) => {
    const [nuevaActividad, setNuevaActividad] = useState({
        nombre: '',
        duracion: 30,
        intensidad: 'moderada'
    });

    /**
     * @function handleAddActividad
     * @description Añade la nueva actividad a la lista de actividades.
     */
    const handleAddActividad = () => {
        if (nuevaActividad.nombre) {
            onChange([...actividades, { ...nuevaActividad }]);
            setNuevaActividad({ nombre: '', duracion: 30, intensidad: 'moderada' });
        }
    };

    /**
     * @function handleRemoveActividad
     * @description Elimina una actividad de la lista por su índice.
     * @param {number} index - El índice de la actividad a eliminar.
     */
    const handleRemoveActividad = (index) => {
        onChange(actividades.filter((_, i) => i !== index));
    };

    return (
        <div className="activity-selector">
            <h4>Añadir actividad física</h4>
            <div className="activity-selector__form">
                <div className="form-row">
                    <div className="form-field">
                        <label>Actividad</label>
                        <select
                            value={nuevaActividad.nombre}
                            onChange={(e) => setNuevaActividad({ ...nuevaActividad, nombre: e.target.value })}
                        >
                            <option value="">Selecciona una actividad</option>
                            {ACTIVIDADES.map(act => (
                                <option key={act} value={act}>{act}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Duración (minutos)</label>
                        <input
                            type="number"
                            min="1"
                            max="300"
                            value={nuevaActividad.duracion}
                            onChange={(e) => setNuevaActividad({ 
                                ...nuevaActividad, 
                                duracion: Number(e.target.value) 
                            })}
                        />
                    </div>
                    <div className="form-field">
                        <label>Intensidad</label>
                        <select
                            value={nuevaActividad.intensidad}
                            onChange={(e) => setNuevaActividad({ 
                                ...nuevaActividad, 
                                intensidad: e.target.value 
                            })}
                        >
                            <option value="baja">Baja</option>
                            <option value="moderada">Moderada</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>
                </div>
                <Button 
                    variant="primary" 
                    onClick={handleAddActividad}
                    disabled={!nuevaActividad.nombre}
                >
                    + Añadir
                </Button>
            </div>
            {actividades.length > 0 && (
                <div className="activity-selector__list">
                    <h4>Actividades registradas hoy:</h4>
                    {actividades.map((act, index) => (
                        <div key={index} className="activity-item">
                            <div className="activity-item__info">
                                <span className="activity-item__name">{act.nombre}</span>
                                <span className="activity-item__details">
                                    {act.duracion} min • {act.intensidad}
                                </span>
                            </div>
                            <button 
                                className="activity-item__remove"
                                onClick={() => handleRemoveActividad(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

ActivitySelector.propTypes = {
    /** La lista de actividades ya registradas. */
    actividades: PropTypes.arrayOf(
        PropTypes.shape({
            /** El nombre de la actividad. */
            nombre: PropTypes.string.isRequired,
            /** La duración de la actividad en minutos. */
            duracion: PropTypes.number.isRequired,
            /** La intensidad de la actividad. */
            intensidad: PropTypes.string.isRequired
        })
    ).isRequired,
    /** Función que se llama cuando la lista de actividades cambia. */
    onChange: PropTypes.func.isRequired
};

export default ActivitySelector;
