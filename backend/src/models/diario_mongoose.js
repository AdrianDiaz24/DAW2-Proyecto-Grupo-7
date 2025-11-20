const mongoose = require('mongoose');
const { Schema } = mongoose;

const diarioSchema = new Schema({
    id_usuario: {
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
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Diario', diarioSchema);