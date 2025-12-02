/**
 * @file Controlador para los contactos de emergencia.
 * @description Gestiona las operaciones CRUD para los contactos de emergencia de los usuarios.
 * @requires ../models/contactoEmergencia_mongoose
 * @requires ../models/usuarios_mongoose
 */
const ContactoEmergencia = require('../models/contactoEmergencia_mongoose');
const User = require('../models/usuarios_mongoose');

/**
 * @function createContacto
 * @description Crea un nuevo contacto de emergencia para el usuario autenticado.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.createContacto = async (req, res) => {
    try {
        const { nombre, telefono, email } = req.body;
        const usuario = req.user.id;

        const nuevoContacto = new ContactoEmergencia({
            usuario,
            nombre,
            telefono,
            email
        });

        await nuevoContacto.save();

        await User.findByIdAndUpdate(usuario, { contactoEmergenciaAnadido: true });

        res.status(201).json({ message: 'Contacto de emergencia creado con éxito', contacto: nuevoContacto });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el contacto de emergencia', error });
    }
};

/**
 * @function getContactos
 * @description Obtiene todos los contactos de emergencia del usuario autenticado.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.getContactos = async (req, res) => {
    try {
        const contactos = await ContactoEmergencia.find({ usuario: req.user.id });
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los contactos de emergencia', error });
    }
};

/**
 * @function getContactoById
 * @description Obtiene un contacto de emergencia específico por su ID.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.getContactoById = async (req, res) => {
    try {
        const contacto = await ContactoEmergencia.findOne({ _id: req.params.id, usuario: req.user.id });
        if (!contacto) {
            return res.status(404).json({ message: 'Contacto de emergencia no encontrado' });
        }
        res.status(200).json(contacto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contacto de emergencia', error });
    }
};

/**
 * @function updateContacto
 * @description Actualiza un contacto de emergencia existente.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.updateContacto = async (req, res) => {
    try {
        const { nombre, telefono, email } = req.body;
        const contacto = await ContactoEmergencia.findOneAndUpdate(
            { _id: req.params.id, usuario: req.user.id },
            { nombre, telefono, email },
            { new: true }
        );

        if (!contacto) {
            return res.status(404).json({ message: 'Contacto de emergencia no encontrado' });
        }

        res.status(200).json({ message: 'Contacto de emergencia actualizado con éxito', contacto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el contacto de emergencia', error });
    }
};

/**
 * @function deleteContacto
 * @description Elimina un contacto de emergencia.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.deleteContacto = async (req, res) => {
    try {
        const contacto = await ContactoEmergencia.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });

        if (!contacto) {
            return res.status(404).json({ message: 'Contacto de emergencia no encontrado' });
        }

        const remainingContactos = await ContactoEmergencia.countDocuments({ usuario: req.user.id });
        if (remainingContactos === 0) {
            await User.findByIdAndUpdate(req.user.id, { contactoEmergenciaAnadido: false });
        }

        res.status(200).json({ message: 'Contacto de emergencia eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el contacto de emergencia', error });
    }
};
