const axios = require('axios');

const GROK_API_URL = 'https://api.openrouteservice.org/grok/4.1/fast';
const API_KEY = process.env.OPENROUTE_API_KEY;

async function analizarDatosUsuario(dataUsuario) {
    try {
        const response = await axios.post(GROK_API_URL, dataUsuario, {
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error llamando OpenRoute API Grok:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { analizarDatosUsuario };
