const mongoose = require('mongoose');

const recompensaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['estrella', 'medalla', 'trofeo'],
    required: true
  },
  motivo: {
    type: String,
    required: true
  },
  fechaOtorgada: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recompensa', recompensaSchema);
