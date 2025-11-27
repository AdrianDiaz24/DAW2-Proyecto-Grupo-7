const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diario.controller');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/authMiddleware');

// Rutas protegidas que requieren autenticación
router.post('/', authMiddleware, diarioController.crearEntradaDiario);
router.get('/', authMiddleware, diarioController.obtenerEntradasDiario);
router.put('/:id', authMiddleware, diarioController.actualizarEntradaDiario);
router.delete('/:id', authMiddleware, diarioController.eliminarEntradaDiario);

// Ruta pública/protegida para obtener una entrada específica
// La autenticación es opcional aquí, el controlador manejará el acceso
router.get('/:id', optionalAuthMiddleware, diarioController.obtenerEntradaDiarioPorId);
router.post('/:id/acceso', diarioController.obtenerEntradaDiarioPorId);


module.exports = router;

