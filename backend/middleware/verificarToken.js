const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = payload.id;
    req.rol = payload.rol;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Token no válido' });
  }
};

module.exports = verificarToken;
