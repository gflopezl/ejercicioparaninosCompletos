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
    enum: ['usuario', 'admin', 'niño'],
    default: 'usuario' // Si no se especifica, será usuario por defecto
  }
}, { timestamps: true });

// Evitar sobreescribir el modelo si ya existe
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
