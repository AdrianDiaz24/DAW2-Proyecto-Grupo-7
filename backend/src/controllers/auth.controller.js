const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // TODO: Añadir validacion

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // TODO: Guardar el usuario en la base de datos
        console.log({ email, hashedPassword, name });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

module.exports = {
    registerUser,
};

