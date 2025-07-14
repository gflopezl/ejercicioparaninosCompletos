const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const enviarCorreo = require('../utils/enviarCorreo'); // Comentado temporalmente

// Registrar usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, correo, contraseña, rol } = req.body;

    const correoExistente = await Usuario.findOne({ correo });
    if (correoExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      fechaNacimiento,
      correo,
      contraseña: hashedPassword,
      rol
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error en registrarUsuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Log para depurar intento de login
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
        correo: usuario.correo,
        rol: usuario.rol,
        fechaInscripcion: usuario.createdAt,
        ultimaSesion: usuario.ultimaSesion
      }
    });
  } catch (error) {
    console.error('❌ Error en iniciarSesion:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener fecha de inscripción por ID
const obtenerFechaInscripcion = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      usuario: usuario.nombre,
      fechaInscripcion: usuario.createdAt
    });
  } catch (error) {
    console.error('❌ Error en obtenerFechaInscripcion:', error);
    res.status(500).json({ error: 'Error al obtener la fecha de inscripción' });
  }
};

// Editar perfil de usuario
const editarPerfil = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const { nombre, fechaNacimiento, correo, contraseña } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (nombre) usuario.nombre = nombre;
    if (fechaNacimiento) usuario.fechaNacimiento = fechaNacimiento;
    if (correo) usuario.correo = correo;
    if (contraseña) {
      usuario.contraseña = await bcrypt.hash(contraseña, 10);
    }

    await usuario.save();
    res.status(200).json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error en editarPerfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};

// Eliminar cuenta de usuario
const eliminarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error en eliminarUsuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// Restablecer clave (puedes dejarlo si más adelante lo reactivas)
const restablecerClave = async (req, res) => {
  const { token } = req.params;
  const { nuevaClave } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.contraseña = await bcrypt.hash(nuevaClave, 10);
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error en restablecerClave:', error);
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
};
//
module.exports = {
  registrarUsuario,
  iniciarSesion,
  obtenerFechaInscripcion,
  editarPerfil,
  eliminarUsuario,
  restablecerClave
  // recuperarClave: comentado temporalmente
};
