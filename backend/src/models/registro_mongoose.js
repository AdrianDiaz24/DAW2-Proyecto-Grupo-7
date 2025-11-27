const mongoose = require('mongoose');
const { Schema } = mongoose;

const registroSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    estadoAnimo: {
        emociones: [{
            nombre: {
                type: String,
                enum: [
                    'Cambios de ánimo',
                    'Sin control',
                    'Bien',
                    'Feliz',
                    'Triste',
                    'Sensible',
                    'Rabia',
                    'Seguridad',
                    'Entusiasmo',
                    'Irritabilidad',
                    'Ansiedad',
                    'Inseguridad',
                    'Gratitud',
                    'Indiferencia'
                ]
            },
            intensidad: Number,
        }],
        comentario: String,
    },
    sueno: {
        horaInicioSueno: String,
        horaDespertar: String,
        dificultadDormir: Boolean,
        despertaresNocturnos: Boolean,
        cansancioDespertar: Boolean,
        suenoNoReparador: Boolean,
        suenosVividos: Boolean,
        notasSueno: String,
    },
    actividadFisica: [{
        nombre: String,
        duracion: Number, // en minutos
        intensidad: {
            type: String,
            enum: ['baja', 'moderada', 'alta'],
        },
    }],
    alimentacion: {
        regularidadComidas: String,
        calidadDieta: {
            frutasVerduras: Boolean,
            ultraprocesados: Boolean,
            azucar: Boolean,
            cafeina: Boolean,
            alcohol: Boolean,
        },
        apetito: {
            type: String,
            enum: ['disminuido', 'normal', 'aumentado'],
        },
    },
    interaccionesSociales: {
        cantidad: {
            type: String,
            enum: ['sociable', 'introvertido'],
        },
        calidad: {
            type: String,
            enum: ['apoyo', 'conflicto'],
        },
        notasSociales: String,
    },
    cognicion: [{
        nombre: {
            type: String,
            enum: [
                'Poca memoria',
                'Niebla mental',
                'Tranquilidad',
                'Estrés',
                'Concentración',
                'Distracción',
                'Motivación',
                'Sin motivación',
                'Creatividad',
                'Alto rendimiento',
                'Bajo rendimiento'
            ]
        },
        intensidad: Number,
    }],
    actividadesPlacenteras: [{
        opcion: String,
        preferencia: Number, // 1-5
    }],
    medicacion: [{
        nombre: String,
        dosis: String,
        tomado: Boolean,
        efectosSecundarios: String,
    }],
    energia: {
        nivel: {
            type: String,
            enum: ['agotamiento', 'cansancio', 'ok', 'vitalizacion', 'alto rendimiento'],
        },
        intensidad: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model('Registro', registroSchema);
