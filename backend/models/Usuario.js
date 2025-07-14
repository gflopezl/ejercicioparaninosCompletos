const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  recompensas: {
    type: Number,
    default: 0
  },
  ultimaSesion: {
    type: Date
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario' // Si no se especifica, será usuario por defecto
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
