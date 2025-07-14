const express = require('express');
const router = express.Router();
const { otorgarRecompensa, obtenerRecompensasPorUsuario } = require('../controllers/recompensaController');

router.post('/otorgar', otorgarRecompensa); // esta es para otorgar una recompensa

router.get('/:id', obtenerRecompensasPorUsuario); // esta es para ver recompensas de un usuario específico

module.exports = router;
