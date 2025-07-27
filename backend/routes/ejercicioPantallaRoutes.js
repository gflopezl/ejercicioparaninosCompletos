const express = require('express');
const router = express.Router();

const {
  crearEjercicio,
  obtenerEjercicios,
  actualizarEjercicio,
  eliminarEjercicio
} = require('../controllers/ejercicioPantallaController');

router.get('/', obtenerEjercicios);
router.post('/', crearEjercicio);
router.put('/:id', actualizarEjercicio);
router.delete('/:id', eliminarEjercicio);

module.exports = router;
