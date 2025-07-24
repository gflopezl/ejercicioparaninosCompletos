const express = require('express');
const router = express.Router();

const {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} = require('../controllers/categoriaController');

const verificarToken = require('../middlewares/verificarToken');
const verificarAdmin = require('../middlewares/verificarAdmin');

// CRUD Categorías (solo admin)
router.post('/', verificarToken, verificarAdmin, crearCategoria);
router.get('/', verificarToken, verificarAdmin, obtenerCategorias);
router.put('/:id', verificarToken, verificarAdmin, actualizarCategoria);
router.delete('/:id', verificarToken, verificarAdmin, eliminarCategoria);

module.exports = router;
