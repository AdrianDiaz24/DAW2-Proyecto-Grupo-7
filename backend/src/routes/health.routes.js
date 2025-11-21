const express = require('express');
const router = express.Router();

// Este es el controlador para la ruta de health check.
// Su única responsabilidad es confirmar que la API está en línea.
const healthCheckController = (req, res) => {
  // Responde con un estado 200 (OK) y un objeto JSON simple.
  res.status(200).json({
    status: 'ok',
    message: 'API is up and running'
  });
};

// Cuando se reciba una petición GET a la ruta raíz ('/') de este enrutador,
// se ejecutará la función healthCheckController.
// En server.js, este enrutador se usa con el prefijo '/api/health',
// por lo que la ruta completa es GET /api/health.
router.get('/health', healthCheckController);

module.exports = router;

