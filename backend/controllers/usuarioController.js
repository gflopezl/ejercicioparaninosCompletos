const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, fechaNacimiento, rol } = req.body;

    // Verificar si el correo ya existe
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashContraseña = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      correo,
      contraseña: hashContraseña,
      fechaNacimiento,
      rol: rol || 'usuario', // rol por defecto usuario
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Iniciar sesión (ya lo tienes)
const iniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    console.log('🔐 Intento de inicio de sesión con:', correo);

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    usuario.ultimaSesion = new Date();
    await usuario.save();

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        fechaNacimiento: usuario.fechaNacimiento,
        correo: usuario.correo,
        rol: usuario.rol,
        fechaInscripcion: usuario.createdAt,
        ultimaSesion: usuario.ultimaSesion,
      },
    });
  } catch (error) {
    console.error('❌ Error en iniciarSesion:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener fecha de inscripción por ID
const obtenerFechaInscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ fechaInscripcion: usuario.createdAt });
  } catch (error) {
    console.error('Error en obtenerFechaInscripcion:', error);
    res.status(500).json({ error: 'Error al obtener fecha de inscripción' });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
  obtenerFechaInscripcion,
};
