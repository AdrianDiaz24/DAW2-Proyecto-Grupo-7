const Registro = require('../models/registro_mongoose');

// Crear un nuevo registro de datos diarios
const createRegistro = async (req, res) => {
    try {
        const usuarioId = req.user.id; // Asumiendo que el middleware de autenticación añade el usuario al request
        const registroData = req.body;

        const nuevoRegistro = new Registro({
            ...registroData,
            usuarioId,
        });

        await nuevoRegistro.save();

        res.status(201).json({ message: 'Registro diario guardado con éxito', data: nuevoRegistro });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el registro diario', error: error.message });
    }
};

// Obtener todos los registros de un usuario
const getRegistros = async (req, res) => {
    try {
        const usuarioId = req.user.id; // Asumiendo que el middleware de autenticación añade el usuario al request

        const registros = await Registro.find({ usuarioId: usuarioId }).sort({ fechaCreacion: -1 });

        res.status(200).json({ data: registros });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los registros', error: error.message });
    }
};

// Obtener un registro específico por su ID
const getRegistroById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.user.id;

        const registro = await Registro.findOne({ _id: id, usuarioId: usuarioId });

        if (!registro) {
            return res.status(404).json({ message: 'No se encontró el registro o no pertenece al usuario.' });
        }

        res.status(200).json({ data: registro });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el registro', error: error.message });
    }
};

// Obtener registros por fecha
const getRegistroByFecha = async (req, res) => {
    try {
        const { fecha } = req.params; // la fecha vendrá en formato YYYY-MM-DD
        const usuarioId = req.user.id;

        // Crear el rango de fechas para todo el día
        const startOfDay = new Date(fecha);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(fecha);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const registros = await Registro.find({
            usuarioId: usuarioId,
            fechaCreacion: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).sort({ fechaCreacion: -1 });

        if (!registros || registros.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros para esta fecha.' });
        }

        res.status(200).json({ data: registros });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los registros por fecha', error: error.message });
    }
};

// Obtener registros por rango de fechas
const getRegistrosByRango = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query; // Fechas en formato YYYY-MM-DD
        const usuarioId = req.user.id;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ message: 'Se requieren las fechas de inicio y fin.' });
        }

        const start = new Date(fechaInicio);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(fechaFin);
        end.setUTCHours(23, 59, 59, 999);

        const registros = await Registro.find({
            usuarioId: usuarioId,
            fechaCreacion: {
                $gte: start,
                $lte: end,
            },
        }).sort({ fechaCreacion: -1 });

        res.status(200).json({ data: registros });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los registros por rango de fechas', error: error.message });
    }
};

module.exports = {
    createRegistro,
    getRegistros,
    getRegistroById,
    getRegistroByFecha,
    getRegistrosByRango,
};
