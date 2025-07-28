const EjercicioPantalla = require('../models/ejercicioPantalla');
const Usuario = require('../models/usuario');

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

// Obtener todos los ejercicios (para el admin)
const obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await EjercicioPantalla.find().sort({ createdAt: -1 });
    res.status(200).json(ejercicios);
  } catch (error) {
    console.error('Error obtener ejercicios:', error);
    res.status(500).json({ mensaje: 'Error al obtener ejercicios', error: error.message });
  }
};

// Obtener ejercicios por edad desde token (para los niños)
const obtenerEjerciciosPorEdadDesdeToken = async (req, res) => {
  try {
    const userId = req.usuarioId;
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const hoy = new Date();
    const nacimiento = new Date(usuario.fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    const ejercicios = await EjercicioPantalla.find({
      'edadRecomendada.desde': { $lte: edad },
      'edadRecomendada.hasta': { $gte: edad }
    });

    if (ejercicios.length === 0) {
      return res.status(404).json({ error: 'No hay ejercicios para esta edad' });
    }

    // Agrega la URL completa a la imagen
    const ejerciciosConURL = ejercicios.map((ej) => ({
      ...ej._doc,
      imagen: `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(ej.imagen)}`
    }));

    res.json(ejerciciosConURL);
  } catch (error) {
    console.error('❌ Error al obtener ejercicios por edad:', error);
    res.status(500).json({ error: 'Error al obtener ejercicios por edad del usuario' });
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
  obtenerEjerciciosPorEdadDesdeToken, // ✅ NUEVO
  actualizarEjercicio,
  eliminarEjercicio
};
