const Categoria = require('../models/Categoria');

// Crear nueva categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, tipo } = req.body;

    const categoriaExistente = await Categoria.findOne({ nombre });
    if (categoriaExistente) {
      return res.status(400).json({ error: 'La categoría ya existe' });
    }

    const nuevaCategoria = new Categoria({ nombre, descripcion, tipo });
    await nuevaCategoria.save();

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría', detalle: error.message });
  }
};

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías', detalle: error.message });
  }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la categoría', detalle: error.message });
  }
};

// Actualizar una categoría
const actualizarCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, tipo } = req.body;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, tipo },
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría', detalle: error.message });
  }
};

// Eliminar una categoría
const eliminarCategoria = async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría', detalle: error.message });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
};
