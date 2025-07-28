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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 py-10 px-4 relative">

      {/* 🎖 Medalla promocional animada */}
      <div className="absolute top-4 left-4 flex flex-col items-center animate-bounce z-10">
        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl border-4 border-white">
          🏅
        </div>
        <p className="mt-2 text-xs font-bold text-yellow-900 text-center w-28">¡Haz ejercicios y gana recompensas!</p>
      </div>

      <h2 className="text-4xl font-bold text-yellow-800 mb-8 text-center">🏁 Tu Camino de Recompensas</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Pista de recompensas */}
      <div className="w-full max-w-screen-lg overflow-x-auto">
        <div className="flex gap-10 items-center justify-start px-6 py-8 bg-white rounded-2xl shadow-2xl relative border-4 border-yellow-300">

          {/* Línea de la pista */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-yellow-400 transform -translate-y-1/2 z-0 rounded-full" />

          {recompensas.map((rec) => (
            <div key={rec._id} className="relative z-10 flex flex-col items-center min-w-[120px]">
              <div className={`rounded-full p-2 border-4 ${rec.lograda ? 'border-green-500 bg-white' : 'border-gray-400 bg-gray-200'} shadow-lg`}>
                {rec.lograda ? (
                  <img src={rec.imagen} alt={rec.nombre} className="w-20 h-20 object-contain" />
                ) : (
                  <div className="w-20 h-20 bg-gray-400 flex items-center justify-center text-white text-2xl rounded-full">
                    🔒
                  </div>
                )}
              </div>
              <p className={`mt-2 text-center text-sm font-semibold ${rec.lograda ? 'text-green-700' : 'text-gray-500'}`}>
                {rec.lograda ? rec.nombre : '???'}
              </p>
              {!rec.lograda && (
                <p className="mt-1 text-center text-xs italic text-yellow-700 flex items-center justify-center gap-1">
                  🏅 ¡Completa más ejercicios para desbloquear!
                </p>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Botón de volver */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate('/perfilusuario')}
          className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-2xl text-lg shadow-lg"
        >
          Volver al perfil
        </button>
      </div>
    </div>
  );
}

export default Recompensas;
