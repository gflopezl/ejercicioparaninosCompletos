import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Consejos() {
  const [consejos, setConsejos] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const obtenerConsejos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/consejos`);
        setConsejos(response.data);
      } catch (error) {
        console.error('Error al obtener consejos:', error);
      }
    };

    obtenerConsejos();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-orange-100 p-6">
      <button
        onClick={() => navigate('/perfilusuario')}
        className="mb-4 bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-full shadow transition-transform hover:scale-105"
      >
        🔙 Volver
      </button>

      <h1 className="text-4xl font-extrabold text-pink-600 mb-6 text-center drop-shadow">
        💡 Consejitos para ti
      </h1>

      {consejos.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No hay consejos disponibles por ahora 💤</p>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {consejos.map((consejo) => (
            <div
              key={consejo._id}
              className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-yellow-300 animate-fade-in"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-2">✨ {consejo.titulo}</h2>
              <p className="text-gray-700 text-lg">{consejo.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Consejos;
