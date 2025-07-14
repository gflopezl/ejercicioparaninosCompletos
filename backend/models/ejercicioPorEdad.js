const express = require('express');
const router = express.Router();
const { obtenerEjerciciosPorEdadDesdeToken } = require('../controllers/ejercicioController');
const verificarToken = require('../middleware/authMiddleware');

// Ruta para obtener ejercicios según edad del usuario autenticado
router.get('/', verificarToken, obtenerEjerciciosPorEdadDesdeToken);

module.exports = router;
