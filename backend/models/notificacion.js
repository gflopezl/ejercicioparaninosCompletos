const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    maxlength: 100
  },
  mensaje: {
    type: String,
    required: true,
    maxlength: 500
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  leida: {
    type: Boolean,
    default: false
  },
  tipo: {
    type: String,
    enum: ['info', 'alerta', 'recordatorio'],
    default: 'info'
  }
}, { timestamps: true });

module.exports = mongoose.model('Notificacion', notificacionSchema);
