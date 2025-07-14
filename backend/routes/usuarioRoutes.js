const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  iniciarSesion,
  obtenerFechaInscripcion
} = require('../controllers/usuarioController');

const verificarToken = require('../middleware/verificarToken');
const verificarAdmin = require('../middleware/verificarAdmin');

// Verificamos que todas las importaciones sean funciones
console.log('registrarUsuario:', typeof registrarUsuario);
console.log('iniciarSesion:', typeof iniciarSesion);
console.log('obtenerFechaInscripcion:', typeof obtenerFechaInscripcion);
console.log('verificarToken:', typeof verificarToken);
console.log('verificarAdmin:', typeof verificarAdmin);

// Público
router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);
router.get('/fecha-inscripcion/:id', obtenerFechaInscripcion);

// Protegido para admins
router.post('/admin/crear-usuario', verificarToken, verificarAdmin, registrarUsuario);

module.exports = router;
