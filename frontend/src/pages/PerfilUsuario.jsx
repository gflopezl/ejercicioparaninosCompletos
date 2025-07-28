import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Notificaciones from './Notificaciones';

function PerfilUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${backendUrl}/api/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuario(res.data);
    } catch (error) {
      console.error('Error al obtener perfil de usuario:', error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-sky-100 to-lime-100 py-10 px-6 relative">

      <button
        type="button"
        onClick={cerrarSesion}
        className="absolute top-6 right-6 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl shadow font-semibold text-sm transition-transform hover:scale-105"
      >
        🔓 Cerrar sesión
      </button>

      <h1 className="text-4xl font-bold text-pink-600 mb-4 drop-shadow">
        🎉 ¡Hola, {usuario?.nombre || 'pequeño/a deportista'}!
      </h1>

      <div className="grid grid-cols-2 gap-5 w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate('/ejercicios-por-edad')}
          className="bg-sky-300 hover:bg-sky-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          🏃‍♂️ Ejercicios
        </button>
        <button
          type="button"
          onClick={() => navigate('/progreso')}
          className="bg-green-300 hover:bg-green-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          📈 Progreso
        </button>
        <button
          type="button"
          onClick={() => navigate('/recompensas')}
          className="bg-yellow-300 hover:bg-yellow-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          ⭐ Recompensas
        </button>
        <button
          type="button"
          onClick={() => navigate('/consejos')}
          className="bg-purple-300 hover:bg-purple-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          💡 Consejos
        </button>
      </div>

      {/* Aquí mostramos las notificaciones usando el componente importado */}
      <div className="mt-12 w-full max-w-md">
        <Notificaciones />
      </div>
    </div>
  );
}

export default PerfilUsuario;
