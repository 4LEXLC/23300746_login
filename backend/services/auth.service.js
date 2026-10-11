const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// Crea un error con un código HTTP para que el controlador lo use.
function authError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

// Encripta la contraseña y guarda al usuario.
async function register({ name, email, password, role }) {
    const passwordHash = await bcrypt.hash(password, 10);
    await userModel.createUser({ name, email, password: passwordHash, role });
}

// Valida las credenciales y genera un token JWT de 1 hora.
async function login({ email, password }) {
    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
        throw authError(400, 'Correo y contraseña requeridos');
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
        throw authError(401, 'Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw authError(401, 'Credenciales Incorrectas');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return { token, name: user.name, role: user.role };
}

module.exports = { register, login };
