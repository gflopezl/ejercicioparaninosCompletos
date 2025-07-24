const express = require('express');
const router = express.Router();
const { registrarProgreso, obtenerProgresoPorUsuario } = require('../controllers/progresoController');

// Verifica que ambos sean funciones válidas antes de usarlas aquí
router.post('/registrar', registrarProgreso);
router.get('/usuario/:id', obtenerProgresoPorUsuario);

module.exports = router;
