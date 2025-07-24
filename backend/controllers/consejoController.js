const Consejo = require('../models/consejo');

const crearConsejo = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevoConsejo = new Consejo({ titulo, descripcion });
    await nuevoConsejo.save();
    res.status(201).json(nuevoConsejo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear consejo' });
  }
};

const obtenerConsejos = async (req, res) => {
  try {
    const consejos = await Consejo.find().sort({ createdAt: -1 });
    res.json(consejos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener consejos' });
  }
};

const actualizarConsejo = async (req, res) => {
  try {
    const { id } = req.params;
    const consejoActualizado = await Consejo.findByIdAndUpdate(id, req.body, { new: true });
    if (!consejoActualizado) {
      return res.status(404).json({ error: 'Consejo no encontrado' });
    }
    res.json(consejoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar consejo' });
  }
};

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
