const express = require('express');
const router = express.Router();
const {
  crearEjercicio,
  obtenerEjercicios,
  obtenerEjerciciosPorEdad,
  obtenerEjerciciosPorEdadDesdeToken,
  actualizarEjercicio,
  eliminarEjercicio
} = require('../controllers/ejercicioController');

const verificarToken = require('../middleware/authMiddleware');

// CRUD
router.post('/', crearEjercicio);
router.get('/', obtenerEjercicios);
router.get('/edad/:edad', obtenerEjerciciosPorEdad); // Ruta antigua por edad manual
router.get('/edad', verificarToken, obtenerEjerciciosPorEdadDesdeToken); // Nueva ruta automática con token
router.put('/:id', actualizarEjercicio);
router.delete('/:id', eliminarEjercicio);

module.exports = router;

