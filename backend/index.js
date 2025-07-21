require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Middlewares personalizados
const verificarToken = require('./middleware/verificarToken');
const verificarAdmin = require('./middleware/verificarAdmin');

// Rutas
const ejercicioRoutes = require('./routes/ejercicioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const progresoRoutes = require('./routes/progresoRoutes');
const recompensaRoutes = require('./routes/recompensaRoutes');
const ejercicioPorEdadRoutes = require('./routes/ejercicioPorEdadRoutes');
const consejoRoutes = require('./routes/consejoRoutes');
const notificacionRoutes = require('./routes/notificacionRoutes');
const categoriasRoutes = require('./routes/categoriaRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/ejercicios', ejercicioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/progreso', progresoRoutes);
app.use('/api/recompensas', recompensaRoutes);
app.use('/api/ejercicio-por-edad', ejercicioPorEdadRoutes);
app.use('/api/consejos', consejoRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/categorias', categoriasRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Ruta ping para pruebas
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((error) => console.error('❌ Error de conexión:', error));

// Escuchar el puerto asignado por Railway (obligatorio)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
