const mongoose = require('mongoose');

const consejoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    maxlength: 100
  },
  descripcion: {
    type: String,
    required: true,
    maxlength: 500
  }
}, { timestamps: true });

module.exports = mongoose.model('Consejo', consejoSchema);
