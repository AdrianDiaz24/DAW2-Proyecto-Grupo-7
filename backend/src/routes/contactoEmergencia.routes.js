const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoEmergencia.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para los contactos de emergencia
router.post('/', authMiddleware, contactoController.createContacto);
router.get('/', authMiddleware, contactoController.getContactos);
router.get('/:id', authMiddleware, contactoController.getContactoById);
router.put('/:id', authMiddleware, contactoController.updateContacto);
router.delete('/:id', authMiddleware, contactoController.deleteContacto);

module.exports = router;

