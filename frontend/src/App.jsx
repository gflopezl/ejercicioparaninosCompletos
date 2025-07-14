import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Administrador from './pages/Administrador.jsx';
import PerfilUsuario from './pages/PerfilUsuario.jsx';
import Ejercicios from './pages/Ejercicios.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/admin" element={<Administrador />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
      <Route path="/ejercicios" element={<Ejercicios />} />
    </Routes>
  );
}

export default App;
