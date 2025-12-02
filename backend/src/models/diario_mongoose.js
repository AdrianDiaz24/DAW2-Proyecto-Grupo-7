/**
 * @file Modelo de Mongoose para las entradas del diario.
 * @description Define el esquema y los métodos para las entradas del diario.
 * @requires mongoose
 * @requires bcryptjs
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const SALT_WORK_FACTOR = 10;

/**
 * @typedef {object} Diario
 * @property {mongoose.Schema.Types.ObjectId} usuarioId - ID del usuario propietario de la entrada.
 * @property {string} titulo - Título de la entrada del diario.
 * @property {string} cuerpo - Contenido de la entrada del diario.
 * @property {string} [password] - Contraseña opcional para proteger la entrada.
 * @property {Date} createdAt - Fecha de creación de la entrada.
 * @property {Date} updatedAt - Fecha de la última actualización de la entrada.
 */
const diarioSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    cuerpo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false, // La contraseña es opcional
    }
}, { timestamps: true });

/**
 * @function pre-save
 * @description Middleware de Mongoose que hashea la contraseña antes de guardar una entrada del diario.
 * @description Se ejecuta solo si la contraseña ha sido modificada o es nueva.
 */
// Hashear la contraseña solo si se ha proporcionado o modificado
diarioSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

/**
 * @method compararPassword
 * @description Compara una contraseña candidata con la contraseña hasheada de la entrada del diario.
 * @param {string} candidatePassword - La contraseña a comparar.
 * @returns {Promise<boolean>} - `true` si las contraseñas coinciden, `false` en caso contrario.
 */
// Métod0 para comparar la contraseña
diarioSchema.methods.compararPassword = async function (candidatePassword) {
    if (!this.password) {
        return false; // No hay contraseña con la que comparar
    }
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Diario', diarioSchema);