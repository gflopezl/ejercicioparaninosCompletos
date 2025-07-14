import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function EjercicioVista({ ejercicioId, usuarioId }) {
  const videoRef = useRef(null);
  const [mostrarMedalla, setMostrarMedalla] = useState(false);

  // 1. Activar cámara
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error('Error al acceder a la cámara:', err));
  }, []);

  // 2. Función al completar ejercicio
  const completarEjercicio = async () => {
    setMostrarMedalla(true);

    try {
      // Guardar en "progreso"
      await axios.post('/api/progreso', {
        usuarioId,
        ejercicioId,
        fecha: new Date(),
        completado: true
      });

      // Guardar en "recompensa"
      await axios.post('/api/recompensa', {
        usuarioId,
        tipo: 'medalla',
        ejercicioId,
        fecha: new Date()
      });
    } catch (error) {
      console.error('Error al registrar ejercicio:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Cámara */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-xl" />
      </div>

      {/* Animación + botón */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
        <img src="/animaciones/elongacion-niña.gif" alt="Niña animada" className="w-2/3 mb-4" />

        <button
          onClick={completarEjercicio}
          className="bg-green-500 text-white px-6 py-2 rounded-full text-lg shadow-lg hover:bg-green-600"
        >
          ¡Terminé el ejercicio!
        </button>

        {/* Medalla tipo Gameboy */}
        {mostrarMedalla && (
          <div className="absolute top-1/3 left-1/3 z-50">
            <img src="/imagenes/medalla-gameboy.png" alt="Medalla" className="w-64 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
}

export default EjercicioVista;
