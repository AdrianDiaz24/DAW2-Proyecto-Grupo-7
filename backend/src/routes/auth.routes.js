const { Router } = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas protegidas - requieren autenticación
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
