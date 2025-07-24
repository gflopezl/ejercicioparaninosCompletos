const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
  contraseña: { type: String, required: true }
});

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
