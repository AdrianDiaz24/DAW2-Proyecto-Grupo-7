const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formulario.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para el formulario inicial
router.post('/', authMiddleware, formularioController.createOrUpdateFormulario);
router.get('/', authMiddleware, formularioController.getFormulario);

module.exports = router;

