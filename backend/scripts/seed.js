require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const User = require(path.join(__dirname, '..', 'src', 'models', 'usuarios_mongoose'));

const dbUri = process.env.URL_DB;

async function seed() {
    try {
        await mongoose.connect(dbUri);
        console.log('Conectado a MongoDB');

        await User.deleteMany({});
        console.log('Users limpiados');

        // Insertar usuarios (ejemplo simple)
        const usuarios = [
            { email: 'user@example.com', password: '123456', nombre: 'Usuario Uno', edad: 25, pronombre: 'él', desencadenantesMalDia: [], roles:['user'] },
            { email: 'admin@example.com', password: 'adminpass', nombre: 'Admin Uno', edad: 30, pronombre: 'ella', desencadenantesMalDia: [], roles:['admin'] },
        ];

        await User.insertMany(usuarios);
        console.log('Usuarios insertados correctamente');

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB, seed finalizado');
    } catch (error) {
        console.error('Error en seed:', error);
        process.exit(1);
    }
}

seed();
