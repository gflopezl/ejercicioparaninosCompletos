const Notificacion = require('../models/notificacion');
const Usuario = require('../models/usuario');
const calcularRangoEdad = require('../utils/edadUtils');

// Crear nueva notificación
const crearNotificacion = async (req, res) => {
  try {
    const datos = req.body;

    // Si se proporciona un usuario, calcular rangoEdad automáticamente
    if (datos.usuarioId) {
      const usuario = await Usuario.findById(datos.usuarioId);
      if (usuario?.fechaNacimiento) {
        datos.rangoEdad = calcularRangoEdad(usuario.fechaNacimiento);
      }
    }

    const nueva = new Notificacion(datos);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener notificaciones filtradas (por usuario y/o rango de edad)
const obtenerNotificaciones = async (req, res) => {
  try {
    const { usuarioId, rangoEdad } = req.query;

    let filtro = {};
    if (usuarioId) filtro.usuarioId = usuarioId;
    if (rangoEdad) filtro.rangoEdad = rangoEdad;

    const todas = await Notificacion.find(filtro).sort({ fecha: -1 });
    res.json(todas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar notificación
const actualizarNotificacion = async (req, res) => {
  try {
    const upd = await Notificacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!upd) return res.status(404).json({ error: 'No encontrada' });
    res.json(upd);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar notificación
const eliminarNotificacion = async (req, res) => {
  try {
    const borrada = await Notificacion.findByIdAndDelete(req.params.id);
    if (!borrada) return res.status(404).json({ error: 'No encontrada' });
    res.json({ mensaje: 'Eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearNotificacion,
  obtenerNotificaciones,
  actualizarNotificacion,
  eliminarNotificacion
};
