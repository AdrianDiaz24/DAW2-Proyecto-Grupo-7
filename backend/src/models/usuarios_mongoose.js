const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email inválido'],
    },
    password: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    edad: {
        type: Number,
        min: 0,
    },
    pronombre: {
        type: String,
        enum: ['él', 'ella', 'elle', 'otro'],
        default: 'otro',
    },
    desencadenantes_Mal_Dia: {
        type: [String],
        default: [],
    }
}, { timestamps: true });

module.exports = mongoose.model('User', usuarioSchema);