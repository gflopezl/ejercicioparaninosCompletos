const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  mensaje: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  leida: {
    type: Boolean,
    default: false,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

module.exports = mongoose.model('Notificacion', notificacionSchema, 'notificacions'); // <- nombre exacto de tu colección
