const bcrypt = require('bcrypt');
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

module.exports = {
    registerUser,
};
