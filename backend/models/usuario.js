const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true }, // Nuevo campo obligatorio
  fechaNacimiento: { type: Date, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  recompensas: { type: Number, default: 0 },
  ultimaSesion: { type: Date },
  rol: {
    type: String,
    enum: ['niño', 'admin'],
    default: 'niño'
  }
}, { timestamps: true });

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
