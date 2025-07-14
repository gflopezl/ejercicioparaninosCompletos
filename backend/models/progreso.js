const mongoose = require('mongoose');

const progresoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  ejercicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ejercicio',
    required: true
  },
  fechaRealizado: {
    type: Date,
    default: Date.now
  },
  repeticionesRealizadas: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Progreso', progresoSchema);
