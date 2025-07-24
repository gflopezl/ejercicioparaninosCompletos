const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Middlewares de autenticación (los tienes definidos)
// const verificarToken = require('./middlewares/verificarToken');
// const verificarAdmin = require('./middlewares/verificarAdmin');

// Rutas
const ejercicioPantallaRoutes = require('./routes/ejercicioPantallaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const progresoRoutes = require('./routes/progresoRoutes');
const ejercicioPorEdadRoutes = require('./routes/ejercicioPorEdadRoutes');
const consejoRoutes = require('./routes/consejoRoutes');
const notificacionRoutes = require('./routes/notificacionRoutes');
const categoriasRoutes = require('./routes/categoriaRoutes');
const recompensaRoutes = require('./routes/recompensaRoutes');

const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/ejercicios-pantalla', ejercicioPantallaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/progresos', progresoRoutes);
app.use('/api/ejercicio-por-edad', ejercicioPorEdadRoutes);
app.use('/api/consejos', consejoRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/recompensas', recompensaRoutes);



// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((error) => console.error('❌ Error de conexión:', error));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
