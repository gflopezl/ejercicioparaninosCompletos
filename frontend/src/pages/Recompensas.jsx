import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const obtenerRecompensas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/recompensas/mis-recompensas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecompensas(response.data);
      } catch (err) {
        console.error('Error al obtener recompensas:', err);
        setError('No se pudieron cargar tus recompensas');
      }
    };

    obtenerRecompensas();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">🏅 Tus Recompensas</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {recompensas.length === 0 ? (
        <p className="text-center">Aún no tienes recompensas</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recompensas.map((rec) => (
            <div
              key={rec._id}
              className="bg-yellow-100 rounded-xl p-4 shadow-md flex flex-col items-center"
            >
              <img
                src={rec.imagen}
                alt={rec.nombre}
                className="w-24 h-24 object-contain mb-2"
              />
              <h3 className="text-lg font-semibold">{rec.nombre}</h3>
              <p className="text-sm text-gray-700">{rec.descripcion}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/perfilusuario')}
          className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded-xl shadow-lg"
        >
          Volver al perfil
        </button>
      </div>
    </div>
  );
}

export default Recompensas;
