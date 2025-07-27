const EjercicioPantalla = require('../models/ejercicioPantalla');

// Crear ejercicio
const crearEjercicio = async (req, res) => {
  try {
    const nuevoEjercicio = new EjercicioPantalla(req.body);
    await nuevoEjercicio.save();
    res.status(201).json(nuevoEjercicio);
  } catch (error) {
    console.error('Error crear ejercicio:', error);
    res.status(500).json({ mensaje: 'Error al crear ejercicio', error: error.message });
  }
};

// Obtener todos los ejercicios
const obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await EjercicioPantalla.find().sort({ createdAt: -1 });
    res.status(200).json(ejercicios);
  } catch (error) {
    console.error('Error obtener ejercicios:', error);
    res.status(500).json({ mensaje: 'Error al obtener ejercicios', error: error.message });
  }
};

// Actualizar ejercicio por id
const actualizarEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const ejercicioActualizado = await EjercicioPantalla.findByIdAndUpdate(id, updates, { new: true });

    if (!ejercicioActualizado) {
      return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
    }

    res.status(200).json(ejercicioActualizado);
  } catch (error) {
    console.error('Error actualizar ejercicio:', error);
    res.status(500).json({ mensaje: 'Error al actualizar ejercicio', error: error.message });
  }
};

// Eliminar ejercicio por id
const eliminarEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await EjercicioPantalla.findByIdAndDelete(id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
    }
    res.status(200).json({ mensaje: 'Ejercicio eliminado' });
  } catch (error) {
    console.error('Error eliminar ejercicio:', error);
    res.status(500).json({ mensaje: 'Error al eliminar ejercicio', error: error.message });
  }
};

module.exports = {
  crearEjercicio,
  obtenerEjercicios,
  actualizarEjercicio,
  eliminarEjercicio,
};
