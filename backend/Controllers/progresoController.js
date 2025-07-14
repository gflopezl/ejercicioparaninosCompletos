const Progreso = require('../models/Progreso');

const registrarProgreso = async (req, res) => {
  try {
    const { usuario, ejercicio, repeticionesRealizadas } = req.body;

    // Crear nuevo registro de progreso
    const nuevoProgreso = new Progreso({
      usuario,
      ejercicio,
      repeticionesRealizadas,
      fecha: new Date()
    });

    await nuevoProgreso.save();
    res.status(201).json({ mensaje: 'Progreso registrado correctamente', progreso: nuevoProgreso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar progreso' });
  }
};

const obtenerProgresoPorUsuario = async (req, res) => {
  try {
    const { id } = req.params; // id del usuario

    const progresoUsuario = await Progreso.find({ usuario: id })
      .populate('ejercicio', 'nombre descripcion') // para mostrar info del ejercicio
      .exec();

    if (!progresoUsuario || progresoUsuario.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró progreso para este usuario' });
    }

    res.json(progresoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
};

module.exports = { registrarProgreso, obtenerProgresoPorUsuario };
