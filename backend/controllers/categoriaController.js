const Categoria = require('../models/Categoria');

// Crear categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Verificar si la categoría existe
    const existe = await Categoria.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ error: 'La categoría ya existe' });
    }

    const categoria = new Categoria({ nombre, descripcion });
    await categoria.save();

    res.status(201).json({ mensaje: 'Categoría creada', categoria });
  } catch (error) {
    console.error('Error crearCategoria:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error obtenerCategorias:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    categoria.nombre = nombre || categoria.nombre;
    categoria.descripcion = descripcion || categoria.descripcion;

    await categoria.save();

    res.status(200).json({ mensaje: 'Categoría actualizada', categoria });
  } catch (error) {
    console.error('Error actualizarCategoria:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndDelete(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json({ mensaje: 'Categoría eliminada' });
  } catch (error) {
    console.error('Error eliminarCategoria:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
};
