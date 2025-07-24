const EjercicioPantalla = require('../models/ejercicioPantalla');
const fs = require('fs');
const path = require('path');

const crearEjercicio = async (req, res) => {
  try {
    const { nombre, descripcion, edadRecomendada, repeticiones } = req.body;

    const nuevoEjercicio = new EjercicioPantalla({
      nombre,
      descripcion,
      edadRecomendada,
      repeticiones,
      archivo: req.file ? req.file.filename : null,
    });

    await nuevoEjercicio.save();
    res.status(201).json({ mensaje: 'Ejercicio creado con éxito', ejercicio: nuevoEjercicio });
  } catch (error) {
    console.error('Error al crear ejercicio:', error);
    res.status(500).json({ error: 'Error al crear ejercicio' });
  }
};

const obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await EjercicioPantalla.find().sort({ nombre: 1 });
    res.status(200).json(ejercicios);
  } catch (error) {
    console.error('Error al obtener ejercicios:', error);
    res.status(500).json({ error: 'Error al obtener ejercicios' });
  }
};

const actualizarEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, edadRecomendada, repeticiones } = req.body;
    const ejercicio = await EjercicioPantalla.findById(id);

    if (!ejercicio) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    // Borrar archivo anterior si hay uno nuevo
    if (req.file && ejercicio.archivo) {
      const archivoPath = path.join(__dirname, '../uploads', ejercicio.archivo);
      if (fs.existsSync(archivoPath)) fs.unlinkSync(archivoPath);
      ejercicio.archivo = req.file.filename;
    }

    ejercicio.nombre = nombre;
    ejercicio.descripcion = descripcion;
    ejercicio.edadRecomendada = edadRecomendada;
    ejercicio.repeticiones = repeticiones;

    await ejercicio.save();
    res.status(200).json({ mensaje: 'Ejercicio actualizado', ejercicio });
  } catch (error) {
    console.error('Error al actualizar ejercicio:', error);
    res.status(500).json({ error: 'Error al actualizar ejercicio' });
  }
};

const eliminarEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const ejercicio = await EjercicioPantalla.findByIdAndDelete(id);
    if (!ejercicio) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    if (ejercicio.archivo) {
      const archivoPath = path.join(__dirname, '../uploads', ejercicio.archivo);
      if (fs.existsSync(archivoPath)) fs.unlinkSync(archivoPath);
    }

    res.status(200).json({ mensaje: 'Ejercicio eliminado' });
  } catch (error) {
    console.error('Error al eliminar ejercicio:', error);
    res.status(500).json({ error: 'Error al eliminar ejercicio' });
  }
};

module.exports = {
  crearEjercicio,
  obtenerEjercicios,
  actualizarEjercicio,
  eliminarEjercicio,
};
