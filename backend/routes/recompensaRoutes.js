const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const recompensa = require('../models/recompensa');

router.get('/recompensa', verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // ← asegúrate que `req.usuario.id` existe

    const recompensas = await Recompensa.find({ usuarioId });

    res.json(recompensas);
  } catch (error) {
    console.error('❌ Error al obtener recompensas:', error);
    res.status(500).json({ error: 'Error al obtener recompensas' });
  }
});

module.exports = router;
