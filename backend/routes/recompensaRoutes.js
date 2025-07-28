const express = require('express');
const router = express.Router();
const { otorgarRecompensa, obtenerRecompensasPorUsuario } = require('../controllers/recompensaController');

// Ruta para otorgar una recompensa
router.post('/', otorgarRecompensa);

// Ruta para obtener recompensas de un usuario
router.get('/usuario/:id', obtenerRecompensasPorUsuario);

module.exports = router;
