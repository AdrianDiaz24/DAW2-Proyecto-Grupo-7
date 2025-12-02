/**
 * @file Middleware de autenticación.
 * @description Contiene middlewares para verificar tokens JWT.
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

/**
 * @function authMiddleware
 * @description Middleware para verificar que una petición contiene un token JWT válido.
 * @description El token debe ser enviado en el header `Authorization` como `Bearer <token>`.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
const authMiddleware = (req, res, next) => {
    // DEBUG: Log para verificar si la clave secreta está cargada
    console.log('JWT_SECRET in middleware:', process.env.JWT_SECRET ? 'Loaded' : '!!! NOT LOADED !!!');

    try {
        // Obtener el token del header
        const token = req.header('Authorization');
        console.log('Authorization Header received:', token); // DEBUG

        // Verificar si no hay token
        if (!token) {
            return res.status(401).json({
                message: 'No token provided, authorization denied'
            });
        }

        // Verificar si el token tiene el formato correcto (Bearer <token>)
        let tokenValue;
        if (token.startsWith('Bearer ')) {
            tokenValue = token.substring(7);
        } else {
            tokenValue = token;
        }
        console.log('Token value being verified:', tokenValue); // DEBUG

        // Verificar el token
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', decoded); // DEBUG

        // Agregar los datos del usuario decodificados al request
        req.user = decoded;

        next();
    } catch (error) {
        console.error('!!! Error verifying token:', error); // DEBUG: Log del error completo

        // Token inválido o expirado
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired'
            });
        }

        res.status(500).json({
            message: 'Server error during authentication',
            error: error.message
        });
    }
};

/**
 * @function optionalAuthMiddleware
 * @description Middleware de autenticación opcional.
 * @description Si se proporciona un token válido, añade la información del usuario a `req.user`.
 * @description Si no se proporciona un token o es inválido, simplemente continúa sin un usuario autenticado.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
const optionalAuthMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            req.user = null;
            return next();
        }

        let tokenValue;
        if (token.startsWith('Bearer ')) {
            tokenValue = token.substring(7);
        } else {
            tokenValue = token;
        }

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        // Si hay error en el token, simplemente continúa sin usuario
        req.user = null;
        next();
    }
};

module.exports = {
    authMiddleware,
    optionalAuthMiddleware,
};
