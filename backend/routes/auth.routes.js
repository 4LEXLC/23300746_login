const router = require('express').Router();
const authController = require('../controller/auth.controller');

// Ruta para registrar usuarios.
router.post('/register', authController.register);
// Ruta para iniciar sesión.
router.post('/login', authController.login);

module.exports = router;
