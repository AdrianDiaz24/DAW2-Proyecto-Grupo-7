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
    calidadSueno: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
    },
    estadoAnimo: {
        type: String,
        required: true,
    },
    nivelAnsiedad: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
    },
    actividades: {
        type: [String],
        default: [],
    },
    notasDiario: {
        type: String,
        default: '',
    },
    agradecimiento: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Registro', registroSchema);
