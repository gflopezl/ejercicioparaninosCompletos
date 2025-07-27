const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Middlewares de autenticación (si los usas más adelante)
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

// ✅ CORS configurado correctamente
const allowedOrigins = [
  'http://localhost:3001', // desarrollo
  'https://ejercicioparaninos-completos.vercel.app' // producción
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas

app.use('/api/ejerciciopantalla', ejercicioPantallaRoutes);
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
