import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import PerfilUsuario from './pages/PerfilUsuario.jsx';
import EjercicioWrapper from './pages/EjercicioWrapper.jsx'; 
import EjerciciosPantalla from "./pages/EjerciciosPantalla.jsx";
import Notificaciones from './pages/Notificaciones.jsx';
import Consejos from './pages/Consejos';
import Progreso from './pages/Progreso';

// Admin
import Administrador from './pages/Administrador/Administrador.jsx';
import SubirEjercicio from './pages/Administrador/SubirEjercicio.jsx';
import UsuariosRegistrados from './pages/Administrador/UsuariosRegistrados.jsx';
import ProgresoAdmin from './pages/Administrador/ProgresoAdmin.jsx';
import NotificacionesAdmin from './pages/Administrador/NotificacionesAdmin.jsx';
import CategoriaAdmin from './pages/Administrador/CategoriaAdmin.jsx';
import RecompensasAdmin from './pages/Administrador/RecompensasAdmin.jsx';
import ConsejosAdmin from './pages/Administrador/ConsejosAdmin.jsx';
import EjerciciosPorEdad from './pages/EjerciciosPorEdad';
import Recompensas from './pages/Recompensas.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/admin" element={<Administrador />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
      <Route path="/ejercicios/:ejercicioId" element={<EjercicioWrapper />} />
      <Route path="/admin/subir-ejercicio" element={<SubirEjercicio />} />
      <Route path="/admin/usuarios-registrados" element={<UsuariosRegistrados />} />
      <Route path="/admin/progreso" element={<ProgresoAdmin />} />
      <Route path="/admin/notificaciones" element={<NotificacionesAdmin />} />
      <Route path="/admin/categoriaadmin" element={<CategoriaAdmin />} />
      <Route path="/admin/recompensas" element={<RecompensasAdmin />} />
      <Route path="/admin/consejos" element={<ConsejosAdmin />} />
      <Route path="/ejercicios" element={<EjerciciosPantalla />} />
      <Route path="/ejercicios-por-edad" element={<EjerciciosPorEdad />} />
      <Route path="/recompensas" element={<Recompensas />} />
      <Route path="/notificaciones" element={<Notificaciones />} />
      <Route path="/consejos" element={<Consejos />} />
      <Route path="/progreso" element={<Progreso />} />
    </Routes>
  );
}

export default App;



