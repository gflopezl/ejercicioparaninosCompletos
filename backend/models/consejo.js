const mongoose = require('mongoose');

const consejoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Consejo', consejoSchema);
