import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [pestañaActiva, setPestañaActiva] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('rol');
    navigate('/');
  };

  const renderContenido = () => {
    switch (pestañaActiva) {
      case 'usuarios':
        return <p>👤 Sección de Usuarios</p>;
      case 'progresos':
        return <p>📈 Sección de Progresos</p>;
      case 'notificaciones':
        return <p>🔔 Sección de Notificaciones</p>;
      case 'recompensas':
        return <p>🌟 Sección de Recompensas</p>;
      case 'consejos':
        return <p>💡 Sección de Consejos</p>;
      default:
        return <p className="text-gray-500">Selecciona una colección desde arriba.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header con botón de logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Panel de Administración</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow"
        >
          🚪 Cerrar sesión
        </button>
      </div>

      {/* Botones de navegación */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setPestañaActiva('usuarios')}
          className={`px-4 py-2 rounded-full text-white ${
            pestañaActiva === 'usuarios' ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
          }`}
        >
          👤 Usuarios
        </button>

        <button
            onClick={() => navigate('/admin/subir-ejercicio')}
            className={`px-4 py-2 rounded-full text-white ${
              pestañaActiva === 'ejercicios' ? 'bg-green-600' : 'bg-green-400 hover:bg-green-500'
            }`}
          >
            🏋️ Ejercicios
          </button>

        <button
          onClick={() => setPestañaActiva('progresos')}
          className={`px-4 py-2 rounded-full text-white ${
            pestañaActiva === 'progresos' ? 'bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
        >
          📈 Progresos
        </button>

        <button
          onClick={() => setPestañaActiva('notificaciones')}
          className={`px-4 py-2 rounded-full text-white ${
            pestañaActiva === 'notificaciones' ? 'bg-purple-600' : 'bg-purple-400 hover:bg-purple-500'
          }`}
        >
          🔔 Notificaciones
        </button>

        <button
          onClick={() => setPestañaActiva('recompensas')}
          className={`px-4 py-2 rounded-full text-white ${
            pestañaActiva === 'recompensas' ? 'bg-pink-600' : 'bg-pink-400 hover:bg-pink-500'
          }`}
        >
          🌟 Recompensas
        </button>

        <button
          onClick={() => setPestañaActiva('consejos')}
          className={`px-4 py-2 rounded-full text-white ${
            pestañaActiva === 'consejos' ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'
          }`}
        >
          💡 Consejos
        </button>
      </div>

      {/* Contenido de cada sección */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 text-center text-lg text-gray-700">
        {renderContenido()}
      </div>
    </div>
  );
};

export default AdminPanel;
