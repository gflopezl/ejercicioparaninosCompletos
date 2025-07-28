const verificarToken = require('../middlewares/verificarToken');

const express = require('express');
const router = express.Router();

const {
  crearEjercicio,
  obtenerEjercicios,
  obtenerEjercicioPorId,
  actualizarEjercicio,
  eliminarEjercicio,
  obtenerEjerciciosPorEdadDesdeToken
} = require('../controllers/ejercicioPantallaController');

router.get('/', obtenerEjercicios);
router.post('/', crearEjercicio);
router.put('/:id', actualizarEjercicio);
router.delete('/:id', eliminarEjercicio);
router.get('/por-edad', verificarToken, obtenerEjerciciosPorEdadDesdeToken);

module.exports = router;
