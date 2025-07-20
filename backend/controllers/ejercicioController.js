const Ejercicio = require('../models/ejercicio');
const Usuario = require('../models/Usuario');

// Crear nuevo ejercicio
const crearEjercicio = async (req, res) => {
  try {
    const nuevoEjercicio = new Ejercicio(req.body);
    await nuevoEjercicio.save();
    res.status(201).json(nuevoEjercicio);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todos los ejercicios
const obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find();
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener ejercicios por edad pasada en la URL (ruta antigua)
const obtenerEjerciciosPorEdad = async (req, res) => {
  try {
    const edad = parseInt(req.params.edad);
    const ejercicios = await Ejercicio.find({
      edadMinima: { $lte: edad },
      edadMaxima: { $gte: edad }
    });
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener ejercicios por edad desde el token del usuario
const obtenerEjerciciosPorEdadDesdeToken = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const hoy = new Date();
    const nacimiento = new Date(usuario.fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    const ejercicios = await Ejercicio.find({
      edadMinima: { $lte: edad },
      edadMaxima: { $gte: edad }
    });

    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Actualizar ejercicio
const actualizarEjercicio = async (req, res) => {
  try {
    const ejercicioActualizado = await Ejercicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ejercicioActualizado) {
      return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
    }
    res.json(ejercicioActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar ejercicio
const eliminarEjercicio = async (req, res) => {
  try {
    const ejercicioEliminado = await Ejercicio.findByIdAndDelete(req.params.id);
    if (!ejercicioEliminado) {
      return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
    }
    res.json({ mensaje: 'Ejercicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearEjercicio,
  obtenerEjercicios,
  obtenerEjerciciosPorEdad,
  obtenerEjerciciosPorEdadDesdeToken, // ✅ NUEVA EXPORTACIÓN
  actualizarEjercicio,
  eliminarEjercicio
};
