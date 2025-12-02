const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactoEmergenciaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del contacto es obligatorio'],
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email no válido']
    }
}, { timestamps: true });

module.exports = mongoose.model('ContactoEmergencia', contactoEmergenciaSchema);

