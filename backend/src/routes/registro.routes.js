const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para el registro de datos diarios
router.post('/', authMiddleware, registroController.createRegistro);
router.get('/', authMiddleware, registroController.getRegistros);
router.get('/rango', authMiddleware, registroController.getRegistrosByRango); // Nueva ruta para rango de fechas
router.get('/fecha/:fecha', authMiddleware, registroController.getRegistroByFecha);
router.get('/:id', authMiddleware, registroController.getRegistroById); // Ruta para ID al final para evitar conflictos

module.exports = router;
