const Notificacion = require('../models/notificacion');
const Usuario = require('../models/usuario');

// Crear notificación
const crearNotificacion = async (req, res) => {
  try {
    const { titulo, mensaje, destinatario } = req.body;
    if (!titulo || !mensaje) {
      return res.status(400).json({ error: 'Título y mensaje son obligatorios' });
    }

    const nueva = new Notificacion({ titulo, mensaje, destinatario: destinatario || 'todos' });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las notificaciones (para admin)
const obtenerNotificacionesAdmin = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find().sort({ creadaEn: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener notificaciones para usuario (filtra por destinatario)
const obtenerNotificacionesUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    if (!usuarioId) return res.status(400).json({ error: 'Falta usuarioId' });

    const notificaciones = await Notificacion.find({
      $or: [
        { destinatario: 'todos' },
        { destinatario: usuarioId }
      ]
    }).sort({ creadaEn: -1 });

    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar notificación por ID
const actualizarNotificacion = async (req, res) => {
  try {
    const actualizado = await Notificacion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ error: 'Notificación no encontrada' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar notificación por ID
const eliminarNotificacion = async (req, res) => {
  try {
    const eliminada = await Notificacion.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Notificación no encontrada' });
    res.json({ mensaje: 'Notificación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearNotificacion,
  obtenerNotificacionesAdmin,
  obtenerNotificacionesUsuario,
  actualizarNotificacion,
  eliminarNotificacion
};
