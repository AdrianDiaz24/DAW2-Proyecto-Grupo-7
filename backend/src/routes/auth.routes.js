/**
 * @file Rutas de autenticación.
 * @description Define los endpoints para el registro, login y perfil de usuario.
 * @requires express
 * @requires ../controllers/auth.controller
 * @requires ../middleware/authMiddleware
 */
const { Router } = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

/**
 * @name POST /api/auth/register
 * @description Ruta para registrar un nuevo usuario.
 * @function
 * @memberof module:routes/auth
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Controlador para manejar la petición.
 */
// Rutas públicas
router.post('/register', registerUser);

/**
 * @name POST /api/auth/login
 * @description Ruta para iniciar sesión.
 * @function
 * @memberof module:routes/auth
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Controlador para manejar la petición.
 */
router.post('/login', loginUser);

/**
 * @name GET /api/auth/profile
 * @description Ruta protegida para obtener el perfil del usuario autenticado.
 * @function
 * @memberof module:routes/auth
 * @param {string} path - URL del endpoint.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} middleware - Controlador para manejar la petición.
 */
// Rutas protegidas - requieren autenticación
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
