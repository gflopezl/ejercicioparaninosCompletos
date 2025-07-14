const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['fuerza', 'coordinación', 'equilibrio', 'respiración', 'concentración', 'otro'], // puedes ajustar estos valores
  }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
