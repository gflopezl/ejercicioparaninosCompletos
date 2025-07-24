const mongoose = require('mongoose');

const ejercicioPantallaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  edadRecomendada: String,
  repeticiones: Number,
  archivo: String // aquí se guarda el nombre del archivo
});

module.exports = mongoose.model('EjercicioPantalla', ejercicioPantallaSchema);
