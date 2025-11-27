const jwt = require('jsonwebtoken');
const User = require('../models/usuarios_mongoose');

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

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Devolver token Y datos del usuario (sin contraseña)
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                nombre: newUser.nombre,
                alias: newUser.alias,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        });
    } catch (error) {
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


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validacion
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.compararPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

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

        // Devolver token Y datos del usuario (sin contraseña)
        res.status(200).json({
            message: 'User logged in successfully',
            token,
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
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

/**
 * Controlador para obtener el perfil del usuario autenticado
 * Esta es una ruta protegida que requiere el authMiddleware
 */
const getProfile = async (req, res) => {
    try {
        // req.user viene del middleware de autenticación
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};
