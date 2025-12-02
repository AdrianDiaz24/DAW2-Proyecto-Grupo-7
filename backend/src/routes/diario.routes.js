/**
 * @file Rutas para el diario.
 * @description Define los endpoints para las operaciones CRUD de las entradas del diario.
 * @requires express
 * @requires ../controllers/diario.controller
 * @requires ../middleware/authMiddleware
 */
const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diario.controller');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/authMiddleware');

// Rutas protegidas que requieren autenticación
/**
 * @name POST /api/diario
 * @description Crea una nueva entrada en el diario.
 * @function
 * @memberof module:routes/diario
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.post('/', authMiddleware, diarioController.crearEntradaDiario);

/**
 * @name GET /api/diario
 * @description Obtiene todas las entradas del diario del usuario autenticado.
 * @function
 * @memberof module:routes/diario
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.get('/', authMiddleware, diarioController.obtenerEntradasDiario);

/**
 * @name PUT /api/diario/:id
 * @description Actualiza una entrada específica del diario.
 * @function
 * @memberof module:routes/diario
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.put('/:id', authMiddleware, diarioController.actualizarEntradaDiario);

/**
 * @name DELETE /api/diario/:id
 * @description Elimina una entrada específica del diario.
 * @function
 * @memberof module:routes/diario
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.delete('/:id', authMiddleware, diarioController.eliminarEntradaDiario);

// Ruta pública/protegida para obtener una entrada específica
// La autenticación es opcional aquí, el controlador manejará el acceso
/**
 * @name GET /api/diario/:id
 * @description Obtiene una entrada específica del diario. La autenticación es opcional.
 * @function
 * @memberof module:routes/diario
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación opcional.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.get('/:id', optionalAuthMiddleware, diarioController.obtenerEntradaDiarioPorId);

/**
 * @name POST /api/diario/:id/acceso
 * @description Permite el acceso a una entrada de diario protegida con contraseña.
 * @function
 * @memberof module:routes/diario
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.post('/:id/acceso', diarioController.obtenerEntradaDiarioPorId);


module.exports = router;
