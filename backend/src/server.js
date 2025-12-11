/**
 * @file Fichero de arranque del servidor.
 * @description Conecta a la base de datos MongoDB y levanta el servidor Express.
 * @requires mongoose
 * @requires dotenv
 * @requires ./app
 */
const mongoose = require('mongoose');
require('dotenv').config();

// Importar la aplicación Express configurada
const app = require('./app');

/**
 * @function validateRequiredEnvVars
 * @description Valida que las variables de entorno críticas estén configuradas
 */
function validateRequiredEnvVars() {
    const requiredVars = [
        'MONGODB_URI',
        'JWT_SECRET',
    ];

    const missingVars = requiredVars.filter(varName => {
        // Comprobar alias
        if (varName === 'MONGODB_URI' && (process.env.MONGODB_URI || process.env.URL_DB)) {
            return false;
        }
        return !process.env[varName];
    });

    if (missingVars.length > 0) {
        console.error('❌ ERROR: Variables de entorno requeridas no configuradas:');
        missingVars.forEach(varName => {
            console.error(`   - ${varName}`);
        });
        console.error('\n💡 Crea un archivo .env basado en .env.example y configura estas variables.');
        console.error('   O ejecuta: ./setup-env.sh para generar automáticamente.\n');
        process.exit(1);
    }

    // Validar longitud mínima del JWT_SECRET
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        console.error('❌ ERROR: JWT_SECRET debe tener al menos 32 caracteres para ser seguro.');
        console.error('💡 Genera uno nuevo con: openssl rand -base64 64\n');
        process.exit(1);
    }

    console.log('✅ Variables de entorno validadas correctamente');
}

// Validar variables de entorno antes de continuar
validateRequiredEnvVars();


/**
 * @constant {number} port
 * @description El puerto en el que se ejecutará el servidor.
 */
// --- Configuración del Puerto ---
const port = process.env.PORT || process.env.PUERTO_BACKEND || 3000;

/**
 * @constant {string} uri
 * @description La URI de conexión a la base de datos MongoDB.
 */
// --- Configuración de MongoDB con Mongoose ---
const uri = process.env.MONGODB_URI || process.env.URL_DB;
if (!uri) {
    console.error("La variable de entorno MONGODB_URI o URL_DB no está definida. Revisa tu archivo .env");
    process.exit(1);
}

/**
 * @function connectDBAndStartServer
 * @description Conecta a la base de datos MongoDB y, si tiene éxito, inicia el servidor Express.
 * @async
 */
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

/**
 * @event SIGINT
 * @description Maneja el cierre de la aplicación (Ctrl+C) para cerrar la conexión a la base de datos de forma segura.
 */
// Manejar el cierre de la aplicación para cerrar la conexión a la BD
process.on('SIGINT', async () => {
    console.log('\n⏹️  Cerrando la conexión a la base de datos...');
    await mongoose.connection.close();
    console.log('✅ Conexión cerrada. Adiós!');
    process.exit(0);
});

/**
 * @event unhandledRejection
 * @description Maneja promesas rechazadas no capturadas para evitar que el proceso se bloquee.
 */
// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    mongoose.connection.close();
    process.exit(1);
});
