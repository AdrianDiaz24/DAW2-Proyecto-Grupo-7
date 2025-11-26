const mongoose = require('mongoose');
require('dotenv').config();

// Importar la aplicación Express configurada
const app = require('./app');

// --- Configuración del Puerto ---
const port = process.env.PORT || process.env.PUERTO_BACKEND || 3000;

// --- Configuración de MongoDB con Mongoose ---
const uri = process.env.MONGODB_URI || process.env.URL_DB;
if (!uri) {
    console.error("La variable de entorno MONGODB_URI o URL_DB no está definida. Revisa tu archivo .env");
    process.exit(1);
}

async function connectDBAndStartServer() {
    try {
        // Conectar a MongoDB usando Mongoose
        await mongoose.connect(uri);
        console.log("✅ Conectado exitosamente a MongoDB con Mongoose!");

        // Iniciar el servidor Express para que escuche peticiones
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
            console.log(`📋 Health check: http://localhost:${port}/api/health`);
            console.log(`🔐 Auth API: http://localhost:${port}/api/auth`);
        });

    } catch (error) {
        // Manejo de errores de conexión a la base de datos
        console.error("❌ No se pudo conectar a la base de datos:", error.message);
        process.exit(1);
    }
}

// Llamar a la función para conectar a la BD e iniciar el servidor
connectDBAndStartServer();

// Manejar el cierre de la aplicación para cerrar la conexión a la BD
process.on('SIGINT', async () => {
    console.log('\n⏹️  Cerrando la conexión a la base de datos...');
    await mongoose.connection.close();
    console.log('✅ Conexión cerrada. Adiós!');
    process.exit(0);
});

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    mongoose.connection.close();
    process.exit(1);
});

