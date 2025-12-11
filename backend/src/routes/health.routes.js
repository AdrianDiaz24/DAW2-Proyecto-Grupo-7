const express = require('express');
const router = express.Router();

/**
 * @function healthCheckController
 * @description Controlador que verifica si la API está disponible
 * @param {object} req - Objeto de petición
 * @param {object} res - Objeto de respuesta
 */
const healthCheckController = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is up and running',
    timestamp: new Date().toISOString()
  });
};

/**
 * @route GET /api/health
 * @description Endpoint de health check para monitoreo
 * @access Public
 */
router.get('/', healthCheckController);

module.exports = router;

