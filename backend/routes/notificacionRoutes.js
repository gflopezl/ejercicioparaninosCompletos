const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const Notificacion = require('../models/notificacion');

router.get('/mis-notificaciones', verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const notificaciones = await Notificacion.find({ usuarioId }).sort({ fecha: -1 });

    res.json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ error: 'Error al obtener notificaciones' });
  }
});

module.exports = router;
