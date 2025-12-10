/**
 * @file Controlador de autenticación.
 * @description Gestiona el registro, inicio de sesión y perfil de los usuarios.
 * @requires jsonwebtoken
 * @requires ../models/usuarios_mongoose
 */
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios_mongoose');

/**
 * @function registerUser
 * @description Registra un nuevo usuario en la base de datos.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validación de campos requeridos
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password and name are required' });
        }

        // Validar longitud de nombre
        if (name.trim().length < 2) {
            return res.status(400).json({ message: 'Name must be at least 2 characters long' });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validar longitud de contraseña
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Guardar el usuario en la base de datos
        const newUser = await User.create({
            email,
            password: password,  // El hook pre('save') del modelo lo hasheará automáticamente
            nombre: name,
        });

        // Crear y firmar el token JWT
        const payload = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.nombre,
        };

        console.log('🔑 Creando token JWT con payload:', payload);

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('✅ Token creado exitosamente en registerUser:', token.substring(0, 30) + '...');

        // Devolver token Y datos del usuario (sin contraseña)
        const response = {
            message: 'User registered successfully',
            token: token,
            user: {
                id: newUser.id,
                email: newUser.email,
                nombre: newUser.nombre,
                alias: newUser.alias,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        };

        console.log('📤 Enviando respuesta de registro con token válido');

        res.status(201).json(response);
    } catch (error) {
        console.error('❌ Error en registerUser:', error);
        // Manejo específico de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation error',
                errors: messages
            });
        }

        // Error de email duplicado (índice único)
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        // Otros errores del servidor
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

/**
 * @function loginUser
 * @description Autentica a un usuario y le proporciona un token JWT.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validacion
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('🔐 Intentando login para:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('❌ Usuario no encontrado:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.compararPassword(password);
        if (!isMatch) {
            console.log('❌ Contraseña incorrecta para:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('✅ Credenciales válidas para:', email);

        // Crear y firmar el token JWT
        const payload = {
            id: user.id,
            email: user.email,
            name: user.nombre,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('🔑 Token generado para login:', token.substring(0, 30) + '...');

        // Devolver token Y datos del usuario (sin contraseña)
        const response = {
            message: 'User logged in successfully',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                alias: user.alias,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        };

        console.log('📤 Enviando respuesta de login');

        res.status(200).json(response);
    } catch (error) {
        console.error('❌ Error en loginUser:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

/**
 * @function getProfile
 * @description Obtiene el perfil del usuario autenticado.
 * @param {object} req - Objeto de petición de Express, con la información del usuario en `req.user`.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const getProfile = async (req, res) => {
    try {
        console.log('👤 getProfile llamado para usuario:', req.user?.id);

        // req.user viene del middleware de autenticación
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            console.log('❌ Usuario no encontrado con ID:', req.user.id);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('✅ Perfil obtenido para:', user.email);

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                alias: user.alias,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error('❌ Error en getProfile:', error);
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};

