const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  mensaje: { type: String, required: true },
  destinatario: { type: String, default: 'todos' },
  creadaEn: { type: Date, default: Date.now }
}, {
  collection: 'notificaciones'  // <-- aquí fuerzas el nombre exacto de la colección
});

module.exports = mongoose.models.Notificacion || mongoose.model('Notificacion', notificacionSchema);
