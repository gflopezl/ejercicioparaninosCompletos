const express = require('express');
const router = express.Router();
const { obtenerEjerciciosPorEdadDesdeToken } = require('../controllers/ejercicioPorEdadController');
const verificarToken = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerEjerciciosPorEdadDesdeToken);

module.exports = router;
