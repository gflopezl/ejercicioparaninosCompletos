const express = require('express');
const router = express.Router();
const {
  crearNotificacion,
  obtenerNotificacionesAdmin,
  obtenerNotificacionesUsuario,
  actualizarNotificacion,
  eliminarNotificacion
} = require('../controllers/notificacionController');

// Rutas admin (CRUD completo)
router.get('/', obtenerNotificacionesAdmin);
router.post('/', crearNotificacion);
router.put('/:id', actualizarNotificacion);
router.delete('/:id', eliminarNotificacion);

// Ruta para que el niño/usuario obtenga solo sus notificaciones
router.get('/usuario', obtenerNotificacionesUsuario);

module.exports = router;
