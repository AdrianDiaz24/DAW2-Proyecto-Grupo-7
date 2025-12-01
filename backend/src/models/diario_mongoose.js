const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const SALT_WORK_FACTOR = 10;

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

// Métod0 para comparar la contraseña
diarioSchema.methods.compararPassword = async function (candidatePassword) {
    if (!this.password) {
        return false; // No hay contraseña con la que comparar
    }
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Diario', diarioSchema);