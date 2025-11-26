const { analizarDatosUsuario } = require('./grokService');

async function analizarUsuario(req, res) {
    try {
        const datosUsuario = req.body; // datos recibidos del frontend

        // Llamada al servicio que consume la API de OpenRoute Grok
        const resultado = await analizarDatosUsuario(datosUsuario);

        // Respuesta con datos analizados
        res.json({ resultado });
    } catch (error) {
        console.error('Error en controlador IA:', error);
        res.status(500).json({ error: 'Error procesando análisis IA' });
    }
}

module.exports = { analizarUsuario };
