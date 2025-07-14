const express = require('express');
const router = express.Router();
const {
  crearNotificacion,
  obtenerNotificaciones,
  actualizarNotificacion,
  eliminarNotificacion
} = require('../controllers/notificacionController');

// CRUD de notificaciones
router.post('/', crearNotificacion);
router.get('/', obtenerNotificaciones);
router.put('/:id', actualizarNotificacion);
router.delete('/:id', eliminarNotificacion);

module.exports = router;
