const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación
 * Verifica que el token JWT sea válido
 * El token debe enviarse en el header Authorization como: Bearer <token>
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
 * Middleware opcional de autenticación
 * Similar al authMiddleware pero no rechaza la petición si no hay token
 * Útil para rutas que pueden funcionar con o sin autenticación
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
