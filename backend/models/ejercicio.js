const mongoose = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edadRecomendada: { type: String, required: true },
  repeticiones: { type: Number, required: true }
});

const Ejercicio = mongoose.models.Ejercicio || mongoose.model('Ejercicio', ejercicioSchema);
