const connection = require('../config/database');

// Consultas parametrizadas para los usuarios.
// Guarda un usuario nuevo en la base de datos y devuelve su id.
async function createUser({ name, email, password, role }) {
    const [result] = await connection.promise().query(
        'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
    );
    return result.insertId;
}

// Busca un usuario por su correo; devuelve null si no existe.
async function findByEmail(email) {
    const [users] = await connection.promise().query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );
    return users[0] || null;
}

module.exports = { createUser, findByEmail };
