const router = require('express').Router();
const authController = require('../controller/auth.controller');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// Ruta para registrar usuarios.
router.post('/register', authController.register);
// Ruta para iniciar sesión.
router.post('/login', authController.login);

// Rutas protegidas: primero se valida el token y luego el rol.
router.get('/admin', verifyToken, requireRole('Administrador'), (req, res) => {
    res.json({ message: 'Acceso de administrador', user: req.user });
});
router.get('/caja', verifyToken, requireRole('Administrador', 'Cajero'), (req, res) => {
    res.json({ message: 'Acceso de caja', user: req.user });
});
router.get('/almacen', verifyToken, requireRole('Administrador', 'Almacen'), (req, res) => {
    res.json({ message: 'Acceso de almacen', user: req.user });
});

module.exports = router;
