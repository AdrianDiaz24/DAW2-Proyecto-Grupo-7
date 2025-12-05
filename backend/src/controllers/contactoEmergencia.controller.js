/**
 * @file Controlador para los contactos de emergencia.
 * @description Gestiona las operaciones CRUD para los contactos de emergencia de los usuarios.
 * @requires ../models/contactoEmergencia_mongoose
 * @requires ../models/usuarios_mongoose
 * @requires nodemailer
 */
const ContactoEmergencia = require('../models/contactoEmergencia_mongoose');
const User = require('../models/usuarios_mongoose');
const nodemailer = require('nodemailer');

/**
 * @function createContacto
 * @description Crea un nuevo contacto de emergencia para el usuario autenticado.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.createContacto = async (req, res) => {
    try {
        const { nombre, telefono, email, relacion } = req.body;
        const usuario = req.user.id;

        const nuevoContacto = new ContactoEmergencia({
            usuario,
            nombre,
            telefono,
            email,
            relacion
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
        const { nombre, telefono, email, relacion } = req.body;
        const contacto = await ContactoEmergencia.findOneAndUpdate(
            { _id: req.params.id, usuario: req.user.id },
            { nombre, telefono, email, relacion },
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

/**
 * @function sendEmergencyEmail
 * @description Envía un email de emergencia a un contacto.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.sendEmergencyEmail = async (req, res) => {
    try {
        const { contactoId } = req.params;
        const usuario = await User.findById(req.user.id);

        // Buscar el contacto de emergencia
        const contacto = await ContactoEmergencia.findOne({ _id: contactoId, usuario: req.user.id });

        if (!contacto) {
            return res.status(404).json({ message: 'Contacto de emergencia no encontrado' });
        }

        if (!contacto.email) {
            return res.status(400).json({ message: 'El contacto no tiene email registrado' });
        }

        // Configurar el transporter de nodemailer
        // Usando Gmail como ejemplo - necesitarás configurar las credenciales en .env
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Nombre del usuario que envía
        const nombreUsuario = usuario?.nombre || 'Un usuario de MindCare';

        // Configurar el mensaje
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: contacto.email,
            subject: '🆘 URGENTE: Solicitud de ayuda de ' + nombreUsuario,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0;">🆘 Mensaje de Emergencia</h1>
                    </div>
                    <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
                        <p style="font-size: 16px; color: #1f2937;">
                            Hola <strong>${contacto.nombre}</strong>,
                        </p>
                        <p style="font-size: 16px; color: #1f2937;">
                            <strong>${nombreUsuario}</strong> te ha añadido como contacto de emergencia en MindCare y está solicitando tu ayuda.
                        </p>
                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
                            <p style="margin: 0; color: #92400e; font-weight: bold;">
                                Por favor, contacta con esta persona lo antes posible.
                            </p>
                        </div>
                        <p style="font-size: 14px; color: #6b7280;">
                            Este mensaje ha sido enviado automáticamente desde la aplicación MindCare.
                        </p>
                    </div>
                </div>
            `
        };

        // Enviar el email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email de emergencia enviado con éxito a ' + contacto.email });
    } catch (error) {
        console.error('Error al enviar email de emergencia:', error);
        res.status(500).json({ message: 'Error al enviar el email de emergencia', error: error.message });
    }
};

