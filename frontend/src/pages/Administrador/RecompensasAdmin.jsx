import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecompensasAdmin = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const obtenerDatos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/recompensas/por-usuario');
      setDatos(res.data);
      setCargando(false);
    } catch (error) {
      console.error('Error al obtener recompensas:', error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const eliminarRecompensa = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/recompensas/${id}`);
      obtenerDatos(); // refrescar lista
    } catch (error) {
      console.error('Error al eliminar recompensa:', error);
    }
  };

  if (cargando) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">🎖️ Panel de Recompensas</h1>
        <button
          onClick={() => navigate('/admin')}
          className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500"
        >
          🔙 Volver al panel
        </button>
      </div>

      {datos.length === 0 ? (
        <p className="text-gray-600">No hay niños con recompensas aún.</p>
      ) : (
        <table className="w-full border text-left text-sm shadow">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">Nombre del Niño</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Recompensas</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((usuario) => (
              <tr key={usuario._id}>
                <td className="p-2 border font-medium">{usuario.nombre}</td>
                <td className="p-2 border">{usuario.recompensas.length}</td>
                <td className="p-2 border">
                  <ul className="list-disc list-inside">
                    {usuario.recompensas.map((r) => (
                      <li key={r._id}>
                        {r.tipo} ({new Date(r.fecha).toLocaleDateString()})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border space-y-1">
                  {usuario.recompensas.map((r) => (
                    <button
                      key={r._id}
                      onClick={() => eliminarRecompensa(r._id)}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 block"
                    >
                      Eliminar {r.tipo}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecompensasAdmin;
