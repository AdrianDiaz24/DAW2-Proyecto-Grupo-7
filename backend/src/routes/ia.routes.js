const express = require('express');
const router = express.Router();
const { analizarUsuario } = require('../ai/grokController');

// Ruta POST para analizar datos via IA (Grok)
router.post('/ai/analyze', analizarUsuario);

module.exports = router;
