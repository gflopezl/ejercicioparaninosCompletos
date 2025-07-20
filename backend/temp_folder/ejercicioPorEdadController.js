const Usuario = require('../models/Usuario');
const Ejercicio = require('../models/Ejercicio');

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
    if (
      mesDiferencia < 0 ||
      (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    const ejercicios = await Ejercicio.find({
      'edadRecomendada.desde': { $lte: edad },
      'edadRecomendada.hasta': { $gte: edad }
    });

    if (ejercicios.length === 0) {
      return res.status(404).json({ error: 'No hay ejercicios para esta edad' });
    }

    res.json(ejercicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener ejercicios por edad del usuario' });
  }
};

module.exports = {
  obtenerEjerciciosPorEdadDesdeToken
};
