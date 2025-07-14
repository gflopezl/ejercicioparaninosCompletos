const verificarAdmin = (req, res, next) => {
  if (req.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: no eres administrador' });
  }
  next();
};

module.exports = verificarAdmin;
