const FormularioInicial = require('../models/formularioInicial_mongoose');

// Crear o actualizar el formulario inicial de un usuario
const createOrUpdateFormulario = async (req, res) => {
    try {
        const usuarioId = req.user.id; // Asumiendo que el middleware de autenticación añade el usuario al request
        const formularioData = req.body;

        const formulario = await FormularioInicial.findOneAndUpdate(
            { usuarioId: usuarioId },
            { ...formularioData, usuarioId: usuarioId },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(201).json({ message: 'Formulario guardado con éxito', data: formulario });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el formulario', error: error.message });
    }
};

// Obtener el formulario inicial de un usuario
const getFormulario = async (req, res) => {
    try {
        const usuarioId = req.user.id; // Asumiendo que el middleware de autenticación añade el usuario al request

        const formulario = await FormularioInicial.findOne({ usuarioId: usuarioId });

        if (!formulario) {
            return res.status(404).json({ message: 'No se encontró un formulario para este usuario.' });
        }

        res.status(200).json({ data: formulario });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el formulario', error: error.message });
    }
};

module.exports = {
    createOrUpdateFormulario,
    getFormulario,
};

