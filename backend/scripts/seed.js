require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

// Importar modelo User según estructura del repo
const User = require(path.join(__dirname, '..', 'src', 'models', 'user.model'));

const dbUri = process.env.URL_DB;

async function seed() {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');

        // Vaciar la colección Users
        await User.deleteMany({});
        console.log('Colección Users limpiada');

        // Insertar dos usuarios de prueba
        const usuarios = [
            {
                email: 'user@example.com',
                contraseña: 'user123', // Puedes hashear antes si quieres
                nombre: 'Usuario Normal',
                edad: 28,
                pronombre: 'él',
                desencadenantesMalDia: ['estrés', 'mal sueño'],
                roles: ['user'],
            },
            {
                email: 'admin@example.com',
                contraseña: 'admin123',
                nombre: 'Administrador',
                edad: 35,
                pronombre: 'ella',
                desencadenantesMalDia: [],
                roles: ['admin'],
            },
        ];

        await User.insertMany(usuarios);
        console.log('Usuarios insertados');

        const todosUsuarios = await User.find({});
        console.log('Usuarios en la base de datos:');
        todosUsuarios.forEach(u => console.log(`${u.nombre} (${u.email}) - Roles: ${u.roles.join(', ')}`));

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB. Seed completado.');
    } catch (error) {
        console.error('Error en seed:', error);
        process.exit(1);
    }
}

seed();