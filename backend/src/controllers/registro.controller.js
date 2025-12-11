const Registro = require('../models/registro_mongoose');

/**
 * @function createRegistro
 * @description Crea un nuevo registro diario del usuario
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const createRegistro = async (req, res) => {
    try {
        console.log('📝 createRegistro called');
        console.log('User from middleware:', req.user); // DEBUG

        if (!req.user || !req.user.id) {
            console.error('❌ User not found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const usuarioId = req.user.id;
        const registroData = req.body;

        console.log('Creando registro para usuario:', usuarioId);
        console.log('Datos del registro:', Object.keys(registroData));

        const nuevoRegistro = new Registro({
            ...registroData,
            usuarioId,
        });

        await nuevoRegistro.save();

        console.log('✅ Registro guardado exitosamente:', nuevoRegistro._id);
        res.status(201).json({ message: 'Registro diario guardado con éxito', data: nuevoRegistro });
    } catch (error) {
        console.error('❌ Error creating registro:', error);
        res.status(500).json({ message: 'Error al guardar el registro diario', error: error.message });
    }
};

/**
 * @function getRegistros
 * @description Obtiene todos los registros del usuario autenticado
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getRegistros = async (req, res) => {
    try {
        console.log('📖 getRegistros called');
        console.log('User from middleware:', req.user); // DEBUG

        if (!req.user || !req.user.id) {
            console.error('❌ User not found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const usuarioId = req.user.id;

        console.log('Obteniendo registros para usuario:', usuarioId);
        const registros = await Registro.find({ usuarioId: usuarioId }).sort({ fechaCreacion: -1 });

        console.log('✅ Se encontraron', registros.length, 'registros');
        res.status(200).json({ data: registros });
    } catch (error) {
        console.error('❌ Error getting registros:', error);
        res.status(500).json({ message: 'Error al obtener los registros', error: error.message });
    }
};

/**
 * @function getRegistroById
 * @description Obtiene un registro específico por su ID
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getRegistroById = async (req, res) => {
    try {
        console.log('🔍 getRegistroById called with ID:', req.params.id);

        if (!req.user || !req.user.id) {
            console.error('❌ User not found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { id } = req.params;
        const usuarioId = req.user.id;

        console.log('Buscando registro:', id, 'para usuario:', usuarioId);
        const registro = await Registro.findOne({ _id: id, usuarioId: usuarioId });

        if (!registro) {
            console.log('⚠️ Registro no encontrado');
            return res.status(404).json({ message: 'No se encontró el registro o no pertenece al usuario.' });
        }

        console.log('✅ Registro encontrado');
        res.status(200).json({ data: registro });
    } catch (error) {
        console.error('❌ Error getting registro by ID:', error);
        res.status(500).json({ message: 'Error al obtener el registro', error: error.message });
    }
};

/**
 * @function getRegistroByFecha
 * @description Obtiene registros de una fecha específica
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getRegistroByFecha = async (req, res) => {
    try {
        console.log('📅 getRegistroByFecha called for:', req.params.fecha);

        if (!req.user || !req.user.id) {
            console.error('❌ User not found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { fecha } = req.params;
        const usuarioId = req.user.id;

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
            console.log('⚠️ No registros found for date:', fecha);
            return res.status(404).json({ message: 'No se encontraron registros para esta fecha.' });
        }

        console.log('✅ Se encontraron', registros.length, 'registros para la fecha');
        res.status(200).json({ data: registros });
    } catch (error) {
        console.error('❌ Error getting registros by fecha:', error);
        res.status(500).json({ message: 'Error al obtener los registros por fecha', error: error.message });
    }
};

/**
 * @function getRegistrosByRango
 * @description Obtiene registros en un rango de fechas
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getRegistrosByRango = async (req, res) => {
    try {
        console.log('📊 getRegistrosByRango called');

        if (!req.user || !req.user.id) {
            console.error('❌ User not found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { fechaInicio, fechaFin } = req.query;
        const usuarioId = req.user.id;

        if (!fechaInicio || !fechaFin) {
            console.log('⚠️ Fechas no proporcionadas');
            return res.status(400).json({ message: 'Se requieren las fechas de inicio y fin.' });
        }

        const start = new Date(fechaInicio);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(fechaFin);
        end.setUTCHours(23, 59, 59, 999);

        console.log('Buscando registros entre:', start, 'y', end);
        const registros = await Registro.find({
            usuarioId: usuarioId,
            fechaCreacion: {
                $gte: start,
                $lte: end,
            },
        }).sort({ fechaCreacion: -1 });

        console.log('✅ Se encontraron', registros.length, 'registros en el rango');
        res.status(200).json({ data: registros });
    } catch (error) {
        console.error('❌ Error getting registros by rango:', error);
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
