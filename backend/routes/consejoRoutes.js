const express = require('express');
const router = express.Router();
const consejoController = require('../controllers/consejoController');

router.post('/', consejoController.crearConsejo);
router.get('/', consejoController.obtenerConsejos);
router.put('/:id', consejoController.actualizarConsejo);
router.delete('/:id', consejoController.eliminarConsejo);

module.exports = router;
