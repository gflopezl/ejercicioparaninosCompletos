const Recompensa = require('../models/recompensa');

const otorgarRecompensa = async (req, res) => {
  try {
    const { usuario, tipo, motivo } = req.body;

    const nuevaRecompensa = new Recompensa({
      usuario,
      tipo,
      motivo
    });

    await nuevaRecompensa.save();
    res.status(201).json({ mensaje: 'Recompensa otorgada', recompensa: nuevaRecompensa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al otorgar recompensa' });
  }
};

const obtenerRecompensasPorUsuario = async (id) => {
  const recompensas = await Recompensa.find({ usuario: id });
  return recompensas;
};

module.exports = {
  otorgarRecompensa,
  obtenerRecompensasPorUsuario
};
