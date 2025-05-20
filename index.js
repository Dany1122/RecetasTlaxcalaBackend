const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error(err));

app.use('/uploads', express.static('uploads'));

    const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const recipesRoutes = require('./routes/recipes');
app.use('/api/recipes', recipesRoutes);

// Ruta básica de prueba
app.get('/api', (req, res) => {
    res.json({ mensaje: "API funcionando" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});