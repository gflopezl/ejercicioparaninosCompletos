const mongoose = require('mongoose');

const ejercicioPantallaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  repeticiones: { type: Number, required: true },
  edadRecomendada: {
    desde: { type: Number, required: true },
    hasta: { type: Number, required: true }
  },
  // Puedes agregar aquí más campos si quieres, ej. urlVideo, imagen, etc.
}, { timestamps: true });

module.exports = mongoose.models.EjercicioPantalla || mongoose.model('EjercicioPantalla', ejercicioPantallaSchema);
