import React from 'react';
import { useNavigate } from 'react-router-dom';

const Administrador = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('rol');
    navigate('/login'); // mejor llevar directo a login
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Panel de Administración</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow"
        >
          🚪 Cerrar sesión
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => navigate('/administrador/usuarios-registrados')}
          className="px-4 py-2 rounded-full text-white bg-blue-400 hover:bg-blue-500"
        >
          👤 Usuarios
        </button>

        <button
          type="button"
          onClick={() => navigate('/administrador/subir-ejercicio')}
          className="px-4 py-2 rounded-full text-white bg-green-400 hover:bg-green-500"
        >
          🏋️ Ejercicios
        </button>

        <button
          type="button"
          onClick={() => navigate('/administrador/progreso')}
          className="px-4 py-2 rounded-full text-white bg-yellow-400 hover:bg-yellow-500"
        >
          📈 Progresos
        </button>

        <button
          type="button"
          onClick={() => navigate('/administrador/notificaciones')}
          className="px-4 py-2 rounded-full text-white bg-purple-400 hover:bg-purple-500"
        >
          🔔 Notificaciones
        </button>

        <button
          type="button"
          onClick={() => navigate('/administrador/recompensas')}
          className="px-4 py-2 rounded-full text-white bg-pink-400 hover:bg-pink-500"
        >
          🌟 Recompensas
        </button>

        <button
          type="button"
          onClick={() => navigate('/administrador/consejos')}
          className="px-4 py-2 rounded-full text-white bg-indigo-400 hover:bg-indigo-500"
        >
          💡 Consejos
        </button>

        <button
          type="button"
          onClick={() => navigate('/administrador/categoriaadmin')}
          className="px-4 py-2 rounded-full text-white bg-teal-400 hover:bg-teal-500"
        >
          🗂️ Categorías
        </button>
      </div>
    </div>
  );
};

export default Administrador;
