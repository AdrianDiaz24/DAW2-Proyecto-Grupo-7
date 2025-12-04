/**
 * @file Rutas para los contactos de emergencia.
 * @description Define los endpoints para las operaciones CRUD de los contactos de emergencia.
 * @requires express
 * @requires ../controllers/contactoEmergencia.controller
 * @requires ../middleware/authMiddleware
 */
const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoEmergencia.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

// Rutas para los contactos de emergencia
/**
 * @name POST /api/contactos
 * @description Crea un nuevo contacto de emergencia.
 * @function
 * @memberof module:routes/contactoEmergencia
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.post('/', authMiddleware, contactoController.createContacto);

/**
 * @name GET /api/contactos
 * @description Obtiene todos los contactos de emergencia del usuario autenticado.
 * @function
 * @memberof module:routes/contactoEmergencia
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.get('/', authMiddleware, contactoController.getContactos);

/**
 * @name GET /api/contactos/:id
 * @description Obtiene un contacto de emergencia específico.
 * @function
 * @memberof module:routes/contactoEmergencia
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.get('/:id', authMiddleware, contactoController.getContactoById);

/**
 * @name PUT /api/contactos/:id
 * @description Actualiza un contacto de emergencia específico.
 * @function
 * @memberof module:routes/contactoEmergencia
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.put('/:id', authMiddleware, contactoController.updateContacto);

/**
 * @name DELETE /api/contactos/:id
 * @description Elimina un contacto de emergencia específico.
 * @function
 * @memberof module:routes/contactoEmergencia
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.delete('/:id', authMiddleware, contactoController.deleteContacto);

/**
 * @name POST /api/contactos-emergencia/:contactoId/send-email
 * @description Envía un email de emergencia a un contacto.
 * @function
 * @memberof module:routes/contactoEmergencia
 */
router.post('/:contactoId/send-email', authMiddleware, contactoController.sendEmergencyEmail);

module.exports = router;
