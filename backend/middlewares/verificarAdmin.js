const verificarAdmin = (req, res, next) => {
  // Verificamos que el token ya agregó el rol a la request
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: no eres administrador' });
  }
  next();
};

module.exports = verificarAdmin;