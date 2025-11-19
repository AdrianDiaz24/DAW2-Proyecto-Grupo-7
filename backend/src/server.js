const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// --- Configuración de Express ---
const app = express();
const port = process.env.PUERTO_BACKEND || 3000;

// --- Configuración de MongoDB ---
const uri = process.env.URL_DB;
if (!uri) {
    console.error("La variable de entorno URL_DB no está definida. Revisa tu archivo .env");
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDBAndStartServer() {
    try {
        // Conectar el cliente al servidor de MongoDB
        await client.connect();
        // Enviar un ping para confirmar una conexión exitosa
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // --- Middlewares y Rutas de Express ---
        // Solo después de una conexión exitosa a la BD, configuramos y arrancamos el servidor.

        // Middleware para parsear JSON
        app.use(express.json());

        // Importar y usar las rutas (ej. health check)
        const healthRoutes = require('./routes/health.routes.js');
        app.use('/api', healthRoutes);

        // Ruta de bienvenida
        app.get('/api/', (req, res) => {
            res.send('¡El servidor está funcionando y conectado a la base de datos!');
        });

        // Iniciar el servidor Express para que escuche peticiones
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });

    } catch (error) {
        // Manejo de errores de conexión a la base de datos
        console.error("No se pudo conectar a la base de datos.", error);
        await client.close(); // Asegurarse de cerrar el cliente si hay un error al inicio
        process.exit(1);
    }
}

// Llamar a la función para conectar a la BD e iniciar el servidor
connectDBAndStartServer();

// Manejar el cierre de la aplicación para cerrar la conexión a la BD
process.on('SIGINT', async () => {
    console.log('Cerrando la conexión a la base de datos...');
    await client.close();
    process.exit(0);
});
