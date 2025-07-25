import { Navigate } from 'react-router-dom';

function RutaProtegida({ children, rolRequerido }) {
  let rol = localStorage.getItem('rol') || '';
  rol = rol.toLowerCase().trim();

  // Permitimos que rolRequerido sea string o array
  const rolesPermitidos = Array.isArray(rolRequerido)
    ? rolRequerido.map(r => r.toLowerCase().trim())
    : [rolRequerido.toLowerCase().trim()];

  // Debug
  console.log('Rol en RutaProtegida:', rol);
  console.log('Roles permitidos:', rolesPermitidos);

  if (!rolesPermitidos.includes(rol)) {
    console.log('Acceso denegado. Redirigiendo a login.');
    return <Navigate to="/login" replace />;
  }

  console.log('Acceso permitido.');
  return children;
}

export default RutaProtegida;
