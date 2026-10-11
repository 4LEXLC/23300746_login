require('dotenv').config({ path: require('node:path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

// Crea la aplicación de Express.
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

// Inicia el servidor solo si se ejecuta este archivo directamente.
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor ejecutandose en puerto ${port}`);
    });
}

module.exports = app;
