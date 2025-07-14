const Consejo = require('../models/Consejo');

// Crear un consejo
const crearConsejo = async (req, res) => {
  try {
    const { titulo, descripcion, imagen } = req.body;
    const nuevoConsejo = new Consejo({ titulo, descripcion, imagen });
    await nuevoConsejo.save();
    res.status(201).json({ mensaje: 'Consejo creado', consejo: nuevoConsejo });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear consejo' });
  }
};

// Obtener todos los consejos
const obtenerConsejos = async (req, res) => {
  try {
    const consejos = await Consejo.find();
    res.json(consejos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener consejos' });
  }
};

// Actualizar consejo
const actualizarConsejo = async (req, res) => {
  try {
    const { id } = req.params;
    const consejoActualizado = await Consejo.findByIdAndUpdate(id, req.body, { new: true });
    if (!consejoActualizado) {
      return res.status(404).json({ error: 'Consejo no encontrado' });
    }
    res.json({ mensaje: 'Consejo actualizado', consejo: consejoActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar consejo' });
  }
};

// Eliminar consejo
const eliminarConsejo = async (req, res) => {
  try {
    const { id } = req.params;
    const consejoEliminado = await Consejo.findByIdAndDelete(id);
    if (!consejoEliminado) {
      return res.status(404).json({ error: 'Consejo no encontrado' });
    }
    res.json({ mensaje: 'Consejo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar consejo' });
  }
};

module.exports = {
  crearConsejo,
  obtenerConsejos,
  actualizarConsejo,
  eliminarConsejo
};
