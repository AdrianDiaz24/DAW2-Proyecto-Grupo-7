const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios_mongoose');

const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validacion
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password and name are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        const newUser = await User.create({
            email,
            password: hashedPassword,
            nombre: name,
        });

        // Excluir la contraseña de la respuesta
        const userResponse = newUser.toObject();
        delete userResponse.password;


        res.status(201).json({ message: 'User registered successfully', user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
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
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear y firmar el token JWT
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.nombre,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;

                // Devolver token Y datos del usuario (sin contraseña)
                res.json({
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
            }
        );

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
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
