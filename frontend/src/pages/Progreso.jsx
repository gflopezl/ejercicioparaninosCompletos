import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProgresoNiño.css';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const niñosEjercicio = [
  { id: 1, emoji: '🤸‍♂️', alt: 'Niño haciendo ejercicio' },
  { id: 2, emoji: '🤸‍♀️', alt: 'Niña haciendo ejercicio' },
  { id: 3, emoji: '🏃‍♂️', alt: 'Niño corriendo' },
  { id: 4, emoji: '🏃‍♀️', alt: 'Niña corriendo' },
  { id: 5, emoji: '🧘‍♂️', alt: 'Niño meditando' },
  { id: 6, emoji: '🧘‍♀️', alt: 'Niña meditando' },
];

function Progreso({ userId }) {
  const [progreso, setProgreso] = useState(0);
  const totalEjercicios = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/progreso/${userId}`)
      .then(res => setProgreso(res.data.ejerciciosCompletados || 0))
      .catch(err => console.error('Error al traer progreso:', err));
  }, [userId]);

  const porcentaje = Math.min((progreso / totalEjercicios) * 100, 100);

  return (
    <div className="progreso-container">
      <div className="carretera">
        <div className="progreso-barra" style={{ width: `${porcentaje}%` }} />
        <div className="lineas" />
        <div className="auto" style={{ left: `${porcentaje}%` }}>🚗</div>
      </div>
      <p>{progreso} de {totalEjercicios} ejercicios completados</p>

      {/* NUEVA FILA DE NIÑOS/NIÑAS HACIENDO EJERCICIO */}
      <div className="niños-ejercicio-container">
        {niñosEjercicio.map(({ id, emoji, alt }) => (
          <div key={id} className="niño-ejercicio" aria-label={alt} role="img" title={alt}>
            {emoji}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/perfilusuario')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition"
        >
          Volver al administrador
        </button>
      </div>
    </div>
  );
}

export default Progreso;
