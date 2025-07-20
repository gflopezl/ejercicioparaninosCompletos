const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  iniciarSesion,
  obtenerFechaInscripcion
} = require('../controllers/usuarioController');

const verificarToken = require('../middleware/verificarToken');
const verificarAdmin = require('../middleware/verificarAdmin');

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);
router.get('/fecha-inscripcion/:id', obtenerFechaInscripcion);

router.post('/admin/crear-usuario', verificarToken, verificarAdmin, registrarUsuario);

module.exports = router;
