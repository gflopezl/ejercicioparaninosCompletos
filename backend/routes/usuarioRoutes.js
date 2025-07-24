const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // modelo mongoose

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('nombre correo fechaNacimiento rol');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// 🔍 Obtener un usuario por correo (para usar en Progreso.jsx)
router.get('/correo/:correo', async (req, res) => {
  try {
    const correo = req.params.correo;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuario por correo', error });
  }
});

module.exports = router;
