const express = require('express');
const router = express.Router();
const { registrarProgreso, obtenerProgresoPorUsuario } = require('../controllers/progresoController');

router.post('/registrar', registrarProgreso);
router.get('/usuario/:id', obtenerProgresoPorUsuario);

module.exports = router;
