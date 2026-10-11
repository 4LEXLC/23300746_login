const authService = require('../services/auth.service');

// Traduce los resultados del servicio a respuestas HTTP.
// Registra un usuario nuevo y responde 201.
async function register(req, res) {
    try {
        await authService.register(req.body || {});
        return res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}

// Inicia sesión y responde con el token del usuario.
async function login(req, res) {
    try {
        const response = await authService.login(req.body || {});
        return res.json(response);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}

module.exports = { register, login };
