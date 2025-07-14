const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, 'miClaveSuperSecreta123!@'); // Clave fija aquí
    req.usuarioId = verificado.id;
    req.rol = verificado.rol;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Token no válido' });
  }
};

module.exports = verificarToken;
