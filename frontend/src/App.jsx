import { Routes, Route } from 'react-router-dom';
import RutaProtegida from './components/RutaProtegida.jsx';

import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import PerfilUsuario from './pages/PerfilUsuario.jsx';
import EjercicioWrapper from './pages/EjercicioWrapper.jsx'; 
import EjerciciosPantalla from "./pages/EjerciciosPantalla.jsx";
import Notificaciones from './pages/Notificaciones.jsx';
import Consejos from './pages/Consejos.jsx';
import Progreso from './pages/Progreso.jsx';
import Recompensas from './pages/Recompensas.jsx';
import Ejerciciosporedad from './pages/Ejerciciosporedad.jsx';

// Admin
import Administrador from './pages/Administrador/Administrador.jsx';
import SubirEjercicio from './pages/Administrador/SubirEjercicio.jsx';
import UsuariosRegistrados from './pages/Administrador/UsuariosRegistrados.jsx';
import ProgresoAdmin from './pages/Administrador/ProgresoAdmin.jsx';
import NotificacionesAdmin from './pages/Administrador/NotificacionesAdmin.jsx';
import CategoriaAdmin from './pages/Administrador/CategoriaAdmin.jsx';
import RecompensasAdmin from './pages/Administrador/RecompensasAdmin.jsx';
import ConsejosAdmin from './pages/Administrador/ConsejosAdmin.jsx';

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Usuario normal */}
      <Route
        path="/perfilusuario" element={
          <RutaProtegida rolRequerido={['niño', 'usuario']}>
            <PerfilUsuario />
          </RutaProtegida>
        }
      />
      <Route path="/ejercicios/:ejercicioId" element={
        <RutaProtegida rolRequerido="usuario">
          <EjercicioWrapper />
        </RutaProtegida>
      } />
      <Route path="/ejercicios" element={
        <RutaProtegida rolRequerido="usuario">
          <EjerciciosPantalla />
        </RutaProtegida>
      } />
      <Route path="/ejercicios-por-edad" element={
        <RutaProtegida rolRequerido="usuario">
          <Ejerciciosporedad />
        </RutaProtegida>
      } />
      <Route path="/recompensas" element={
        <RutaProtegida rolRequerido="usuario">
          <Recompensas />
        </RutaProtegida>
      } />
      <Route path="/notificaciones" element={
        <RutaProtegida rolRequerido="usuario">
          <Notificaciones />
        </RutaProtegida>
      } />
      <Route path="/consejos" element={
        <RutaProtegida rolRequerido="usuario">
          <Consejos />
        </RutaProtegida>
      } />
      <Route path="/progreso" element={
        <RutaProtegida rolRequerido="usuario">
          <Progreso />
        </RutaProtegida>
      } />

      {/* Rutas de administrador */}
      <Route path="/administrador" element={
        <RutaProtegida rolRequerido="admin">
          <Administrador />
        </RutaProtegida>
      } />
      <Route path="/admin/subir-ejercicio" element={
        <RutaProtegida rolRequerido="admin">
          <SubirEjercicio />
        </RutaProtegida>
      } />
      <Route path="/admin/usuarios-registrados" element={
        <RutaProtegida rolRequerido="admin">
          <UsuariosRegistrados />
        </RutaProtegida>
      } />
      <Route path="/admin/progreso" element={
        <RutaProtegida rolRequerido="admin">
          <ProgresoAdmin />
        </RutaProtegida>
      } />
      <Route path="/admin/notificaciones" element={
        <RutaProtegida rolRequerido="admin">
          <NotificacionesAdmin />
        </RutaProtegida>
      } />
      <Route path="/admin/categoriaadmin" element={
        <RutaProtegida rolRequerido="admin">
          <CategoriaAdmin />
        </RutaProtegida>
      } />
      <Route path="/admin/recompensas" element={
        <RutaProtegida rolRequerido="admin">
          <RecompensasAdmin />
        </RutaProtegida>
      } />
      <Route path="/admin/consejos" element={
        <RutaProtegida rolRequerido="admin">
          <ConsejosAdmin />
        </RutaProtegida>
      } />
    </Routes>
  );
}

export default App;
