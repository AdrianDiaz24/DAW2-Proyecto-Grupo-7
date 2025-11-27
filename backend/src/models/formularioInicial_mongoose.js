const mongoose = require('mongoose');
const { Schema } = mongoose;

const formularioInicialSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    factoresDetonantes: {
        relaciones: [{
            opcion: { type: String, enum: ['Conflicto con familiares', 'Conflicto con amigos', 'Conflicto con pareja', 'Aislamiento social', 'Críticas/juicios'] },
            intensidad: { type: Number, min: 1, max: 5 }
        }],
        trabajoEstudio: [{
            opcion: { type: String, enum: ['Sobrecarga laboral', 'Exámenes', 'Falta de reconocimiento', 'Cambios en responsabilidades'] },
            intensidad: { type: Number, min: 1, max: 5 }
        }],
        rutinaHabitos: [{
            opcion: { type: String, enum: ['Sueño irregular', 'Alimentación irregular', 'Falta de ejercicio', 'Desorganización'] },
            intensidad: { type: Number, min: 1, max: 5 }
        }],
        emociones: [{
            opcion: { type: String, enum: ['Ansiedad', 'Estrés', 'Irritabilidad', 'Baja autoestima', 'Culpa'] },
            intensidad: { type: Number, min: 1, max: 5 }
        }],
        estimulosExternos: [{
            opcion: { type: String, enum: ['Noticias negativas', 'Redes sociales', 'Ruido / ambiente caótico'] },
            intensidad: { type: Number, min: 1, max: 5 }
        }],
        saludFisica: [{
            opcion: { type: String, enum: ['Enfermedad', 'Dolor', 'Fatiga'] },
            intensidad: { type: Number, min: 1, max: 5 }
        }]
    },
    actividadesPlacenteras: {
        actividadFisica: [{
            opcion: { type: String, enum: ['Caminar', 'Correr', 'Yoga', 'Natación', 'Pilates', 'Ciclismo', 'Entrenamiento de fuerza'] },
            preferencia: { type: Number, min: 1, max: 5 }
        }],
        social: [{
            opcion: { type: String, enum: ['Pasar tiempo con amigos', 'Llamadas familiares', 'Actividades en grupo', 'Voluntariado'] },
            preferencia: { type: Number, min: 1, max: 5 }
        }],
        creatividadHobbies: [{
            opcion: { type: String, enum: ['Pintar', 'Dibujar', 'Escribir', 'Música', 'Fotografía', 'Manualidades'] },
            preferencia: { type: Number, min: 1, max: 5 }
        }],
        cuidadoPersonal: [{
            opcion: { type: String, enum: ['Meditación', 'Baño relajante', 'Dormir', 'Alimentación saludable'] },
            preferencia: { type: Number, min: 1, max: 5 }
        }],
        entretenimiento: [{
            opcion: { type: String, enum: ['Leer', 'Ver series/películas', 'Juegos de mesa', 'Videojuegos'] },
            preferencia: { type: Number, min: 1, max: 5 }
        }],
        logroAprendizaje: [{
            opcion: { type: String, enum: ['Aprender algo nuevo', 'Estudiar', 'Proyectos personales', 'Cursos online'] },
            preferencia: { type: Number, min: 1, max: 5 }
        }]
    },
    comentariosDetonantes: String,
    comentariosActividades: String,
}, { timestamps: true });

module.exports = mongoose.model('FormularioInicial', formularioInicialSchema);

