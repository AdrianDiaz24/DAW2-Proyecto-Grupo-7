/**
 * @file Página de Seguimiento Diario.
 * @description Un formulario de varios pasos para que los usuarios registren su estado de ánimo, sueño, actividad y otros datos diarios.
 * @requires react
 * @requires react-router-dom
 * @requires ../store/authStore
 * @requires ../config/api
 * @requires ../components/molecules/EmotionSelector
 * @requires ../components/molecules/ActivitySelector
 * @requires ../components/molecules/CognitionSelector
 * @requires ../components/atoms/Slider
 * @requires ../components/atoms/Checkbox
 * @requires ../components/atoms/Button
 * @requires ../styles/Seguimiento.css
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { apiConfig } from "../config/api";
import EmotionSelector from "../components/molecules/EmotionSelector";
import ActivitySelector from "../components/molecules/ActivitySelector";
import CognitionSelector from "../components/molecules/CognitionSelector";
import Slider from "../components/atoms/Slider";
import Checkbox from "../components/atoms/Checkbox";
import Button from "../components/atoms/Button";
import "../styles/Seguimiento.css";

/**
 * @function Seguimiento
 * @description Componente principal de la página de seguimiento. Gestiona el estado del formulario de varios pasos y el envío de datos.
 * @returns {JSX.Element} La página de seguimiento.
 */
const Seguimiento = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const totalSteps = 8;

    // Estado del formulario completo
    const [formData, setFormData] = useState({
        estadoAnimo: {
            emociones: [],
            comentario: ''
        },
        sueno: {
            horaInicioSueno: '',
            horaDespertar: '',
            dificultadDormir: false,
            despertaresNocturnos: false,
            cansancioDespertar: false,
            suenoNoReparador: false,
            suenosVividos: false,
            notasSueno: ''
        },
        actividadFisica: [],
        energia: {
            nivel: 'ok',
            intensidad: 5
        },
        alimentacion: {
            regularidadComidas: '',
            calidadDieta: {
                frutasVerduras: false,
                ultraprocesados: false,
                azucar: false,
                cafeina: false,
                alcohol: false
            },
            apetito: 'normal'
        },
        interaccionesSociales: {
            cantidad: 'sociable',
            calidad: 'apoyo',
            notasSociales: ''
        },
        cognicion: [],
        actividadesPlacenteras: [],
        medicacion: []
    });

    /**
     * @function handleSubmit
     * @description Envía los datos del formulario de seguimiento al backend.
     * @async
     */
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { apiFetch } = await import('../config/api');
            const response = await apiFetch(apiConfig.endpoints.registros, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('¡Registro guardado exitosamente!');
                navigate('/home');
            } else {
                const data = await response.json();
                alert(`Error: ${data.message || 'No se pudo guardar el registro'}`);
            }
        } catch (error) {
            console.error('Error al guardar el registro:', error);
            alert('Error al guardar el registro');
        } finally {
            setLoading(false);
        }
    };

    /**
     * @function nextStep
     * @description Avanza al siguiente paso del formulario.
     */
    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));

    /**
     * @function prevStep
     * @description Retrocede al paso anterior del formulario.
     */
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    /**
     * @function getStepLabel
     * @description Obtiene la etiqueta para un paso específico del formulario.
     * @param {number} step - El número del paso.
     * @returns {string} La etiqueta del paso.
     */
    const getStepLabel = (step) => {
        const labels = ['Ánimo', 'Sueño', 'Actividad', 'Energía', 'Alimentación', 'Social', 'Cognición', 'Extras'];
        return `${step}. ${labels[step - 1]}`;
    };

    return (
        <div className="seguimiento-page">
            <div className="seguimiento-container">
                <header className="seguimiento-header">
                    <h1>Seguimiento Diario</h1>
                    <p>Completa tu registro del día - Paso {currentStep} de {totalSteps}</p>
                </header>

                {/* Progress indicator */}
                <div className="seguimiento-progress">
                    <div className="seguimiento-progress__bar">
                        <div
                            className="seguimiento-progress__fill"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                    <div className="seguimiento-progress__steps">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
                            <span key={step} className={currentStep >= step ? 'active' : ''}>
                                {getStepLabel(step)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Step 1: Estado de Ánimo */}
                {currentStep === 1 && (
                    <div className="seguimiento-step">
                        <EmotionSelector
                            emociones={formData.estadoAnimo.emociones}
                            onChange={(emociones) => setFormData({
                                ...formData,
                                estadoAnimo: { ...formData.estadoAnimo, emociones }
                            })}
                            comentario={formData.estadoAnimo.comentario}
                            onComentarioChange={(comentario) => setFormData({
                                ...formData,
                                estadoAnimo: { ...formData.estadoAnimo, comentario }
                            })}
                        />
                    </div>
                )}

                {/* Step 2: Sueño */}
                {currentStep === 2 && (
                    <div className="seguimiento-step">
                        <h3>Sueño</h3>
                        <p className="step-description">¿Cómo has dormido?</p>

                        <div className="form-group">
                            <label>Hora de inicio de sueño</label>
                            <input
                                type="time"
                                value={formData.sueno.horaInicioSueno}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    sueno: { ...formData.sueno, horaInicioSueno: e.target.value }
                                })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Hora de despertar</label>
                            <input
                                type="time"
                                value={formData.sueno.horaDespertar}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    sueno: { ...formData.sueno, horaDespertar: e.target.value }
                                })}
                            />
                        </div>

                        <div className="form-group">
                            <h4>Características del sueño</h4>
                            <div className="checkbox-group">
                                <Checkbox
                                    label="Dificultad para dormir"
                                    checked={formData.sueno.dificultadDormir}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        sueno: { ...formData.sueno, dificultadDormir: checked }
                                    })}
                                />
                                <Checkbox
                                    label="Despertares nocturnos"
                                    checked={formData.sueno.despertaresNocturnos}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        sueno: { ...formData.sueno, despertaresNocturnos: checked }
                                    })}
                                />
                                <Checkbox
                                    label="Cansancio al despertar"
                                    checked={formData.sueno.cansancioDespertar}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        sueno: { ...formData.sueno, cansancioDespertar: checked }
                                    })}
                                />
                                <Checkbox
                                    label="Sueño no reparador"
                                    checked={formData.sueno.suenoNoReparador}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        sueno: { ...formData.sueno, suenoNoReparador: checked }
                                    })}
                                />
                                <Checkbox
                                    label="Sueños vívidos"
                                    checked={formData.sueno.suenosVividos}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        sueno: { ...formData.sueno, suenosVividos: checked }
                                    })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Notas adicionales</label>
                            <textarea
                                value={formData.sueno.notasSueno}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    sueno: { ...formData.sueno, notasSueno: e.target.value }
                                })}
                                placeholder="Algo más sobre tu sueño..."
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Actividad Física */}
                {currentStep === 3 && (
                    <div className="seguimiento-step">
                        <h3>Actividad Física</h3>
                        <p className="step-description">¿Qué actividades físicas has realizado hoy?</p>

                        <ActivitySelector
                            actividades={formData.actividadFisica}
                            onChange={(actividades) => setFormData({
                                ...formData,
                                actividadFisica: actividades
                            })}
                        />
                    </div>
                )}

                {/* Step 4: Energía */}
                {currentStep === 4 && (
                    <div className="seguimiento-step">
                        <h3>Energía y Vitalidad</h3>
                        <p className="step-description">¿Cómo ha sido tu nivel de energía hoy?</p>

                        <div className="form-group">
                            <label>Nivel de energía</label>
                            <div className="energy-selector">
                                {['agotamiento', 'cansancio', 'ok', 'vitalizacion', 'alto rendimiento'].map(nivel => (
                                    <label key={nivel} className="radio-option">
                                        <input
                                            type="radio"
                                            name="energia"
                                            value={nivel}
                                            checked={formData.energia.nivel === nivel}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                energia: { ...formData.energia, nivel: e.target.value }
                                            })}
                                        />
                                        <span>{nivel.charAt(0).toUpperCase() + nivel.slice(1).replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Slider
                            label="Intensidad de la energía"
                            value={formData.energia.intensidad}
                            onChange={(value) => setFormData({
                                ...formData,
                                energia: { ...formData.energia, intensidad: value }
                            })}
                            min={1}
                            max={10}
                        />
                    </div>
                )}

                {/* Step 5: Alimentación */}
                {currentStep === 5 && (
                    <div className="seguimiento-step">
                        <h3>Alimentación</h3>
                        <p className="step-description">¿Cómo ha sido tu alimentación hoy?</p>

                        <div className="form-group">
                            <label>Regularidad de comidas</label>
                            <textarea
                                value={formData.alimentacion.regularidadComidas}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    alimentacion: { ...formData.alimentacion, regularidadComidas: e.target.value }
                                })}
                                placeholder="Describe cuántas comidas has hecho hoy..."
                                rows={2}
                            />
                        </div>

                        <div className="form-group">
                            <h4>Calidad de la dieta</h4>
                            <div className="checkbox-group">
                                <Checkbox
                                    label="Frutas/Verduras"
                                    checked={formData.alimentacion.calidadDieta.frutasVerduras}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        alimentacion: {
                                            ...formData.alimentacion,
                                            calidadDieta: { ...formData.alimentacion.calidadDieta, frutasVerduras: checked }
                                        }
                                    })}
                                />
                                <Checkbox
                                    label="Ultraprocesados"
                                    checked={formData.alimentacion.calidadDieta.ultraprocesados}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        alimentacion: {
                                            ...formData.alimentacion,
                                            calidadDieta: { ...formData.alimentacion.calidadDieta, ultraprocesados: checked }
                                        }
                                    })}
                                />
                                <Checkbox
                                    label="Azúcar"
                                    checked={formData.alimentacion.calidadDieta.azucar}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        alimentacion: {
                                            ...formData.alimentacion,
                                            calidadDieta: { ...formData.alimentacion.calidadDieta, azucar: checked }
                                        }
                                    })}
                                />
                                <Checkbox
                                    label="Cafeína"
                                    checked={formData.alimentacion.calidadDieta.cafeina}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        alimentacion: {
                                            ...formData.alimentacion,
                                            calidadDieta: { ...formData.alimentacion.calidadDieta, cafeina: checked }
                                        }
                                    })}
                                />
                                <Checkbox
                                    label="Alcohol"
                                    checked={formData.alimentacion.calidadDieta.alcohol}
                                    onChange={(checked) => setFormData({
                                        ...formData,
                                        alimentacion: {
                                            ...formData.alimentacion,
                                            calidadDieta: { ...formData.alimentacion.calidadDieta, alcohol: checked }
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Apetito</label>
                            <div className="energy-selector">
                                {['disminuido', 'normal', 'aumentado'].map(nivel => (
                                    <label key={nivel} className="radio-option">
                                        <input
                                            type="radio"
                                            name="apetito"
                                            value={nivel}
                                            checked={formData.alimentacion.apetito === nivel}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                alimentacion: { ...formData.alimentacion, apetito: e.target.value }
                                            })}
                                        />
                                        <span>{nivel.charAt(0).toUpperCase() + nivel.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 6: Interacciones Sociales */}
                {currentStep === 6 && (
                    <div className="seguimiento-step">
                        <h3>Interacciones Sociales</h3>
                        <p className="step-description">¿Cómo han sido tus interacciones sociales hoy?</p>

                        <div className="form-group">
                            <label>Cantidad de interacciones</label>
                            <div className="energy-selector">
                                {['sociable', 'introvertido'].map(tipo => (
                                    <label key={tipo} className="radio-option">
                                        <input
                                            type="radio"
                                            name="cantidad"
                                            value={tipo}
                                            checked={formData.interaccionesSociales.cantidad === tipo}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                interaccionesSociales: {
                                                    ...formData.interaccionesSociales,
                                                    cantidad: e.target.value
                                                }
                                            })}
                                        />
                                        <span>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Calidad de interacciones</label>
                            <div className="energy-selector">
                                {['apoyo', 'conflicto'].map(tipo => (
                                    <label key={tipo} className="radio-option">
                                        <input
                                            type="radio"
                                            name="calidad"
                                            value={tipo}
                                            checked={formData.interaccionesSociales.calidad === tipo}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                interaccionesSociales: {
                                                    ...formData.interaccionesSociales,
                                                    calidad: e.target.value
                                                }
                                            })}
                                        />
                                        <span>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Notas sobre interacciones sociales</label>
                            <textarea
                                value={formData.interaccionesSociales.notasSociales}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    interaccionesSociales: {
                                        ...formData.interaccionesSociales,
                                        notasSociales: e.target.value
                                    }
                                })}
                                placeholder="Describe tus interacciones sociales del día..."
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {/* Step 7: Cognición */}
                {currentStep === 7 && (
                    <div className="seguimiento-step">
                        <CognitionSelector
                            cognicion={formData.cognicion}
                            onChange={(cognicion) => setFormData({
                                ...formData,
                                cognicion
                            })}
                        />
                    </div>
                )}

                {/* Step 8: Actividades Placenteras y Medicación */}
                {currentStep === 8 && (
                    <div className="seguimiento-step">
                        <h3>Actividades Placenteras y Medicación</h3>
                        <p className="step-description">Información adicional sobre tu día</p>

                        <div className="info-box info-box--warning">
                            <p>💡 <strong>Actividades Placenteras:</strong> Esta sección se completará automáticamente cuando configures tus actividades preferidas en el formulario inicial.</p>
                        </div>

                        <div className="info-box info-box--info" style={{ marginTop: '1rem' }}>
                            <p>💊 <strong>Medicación:</strong> Podrás añadir tu medicación en futuras versiones. Por ahora, puedes dejar esta sección vacía.</p>
                        </div>

                        <div className="form-group" style={{ marginTop: '2rem' }}>
                            <h4>Resumen de tu registro</h4>
                            <div className="summary-box">
                                <div className="summary-item">
                                    <span className="summary-label">Emociones registradas:</span>
                                    <span className="summary-value">{formData.estadoAnimo.emociones.length}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Actividades físicas:</span>
                                    <span className="summary-value">{formData.actividadFisica.length}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Aspectos cognitivos:</span>
                                    <span className="summary-value">{formData.cognicion.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="seguimiento-actions">
                    {currentStep > 1 && (
                        <Button variant="outline" onClick={prevStep}>
                            ← Anterior
                        </Button>
                    )}
                    {currentStep < totalSteps ? (
                        <Button variant="primary" onClick={nextStep}>
                            Siguiente →
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : '✓ Guardar Registro'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Seguimiento;
