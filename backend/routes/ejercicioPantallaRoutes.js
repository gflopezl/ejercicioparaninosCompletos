const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const EjercicioPantalla = require('../models/ejercicioPantalla');

// Subir ejercicio con archivo
router.post('/', upload.single('archivo'), async (req, res) => {
  try {
    const { nombre, descripcion, edadRecomendada, repeticiones } = req.body;
    const nuevoEjercicio = new EjercicioPantalla({
      nombre,
      descripcion,
      edadRecomendada,
      repeticiones,
      archivo: req.file ? req.file.filename : null
    });

    const guardado = await nuevoEjercicio.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error('❌ Error al subir ejercicio:', error);
    res.status(500).json({ mensaje: 'Error del servidor al subir ejercicio.' });
  }
});

module.exports = router;
