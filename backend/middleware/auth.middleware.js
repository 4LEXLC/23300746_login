const jwt = require('jsonwebtoken');

// Verifica que la petición traiga un JWT válido en el header Authorization.
function verifyToken(req, res, next) {
    const header = req.headers.authorization || '';
    const [type, token] = header.split(' ');

    if (type !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

// Permite el paso solo si el rol del token está en la lista de roles permitidos.
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No tienes permisos' });
        }
        next();
    };
}

module.exports = { verifyToken, requireRole };
