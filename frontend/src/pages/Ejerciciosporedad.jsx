import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EjerciciosPorEdad = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerEjercicios = async () => {
      try {
        const token = localStorage.getItem('token'); // 🔐 Asegúrate que el token esté guardado
        const response = await axios.get('https://ejerciciosparaninos-api.vercel.app/api/ejercicios/por-edad', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEjercicios(response.data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los ejercicios.');
      }
    };

    obtenerEjercicios();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Ejercicio recomendado para ti</h1>

      {ejercicios.map((ej, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-col items-center gap-4"
        >
          <img src={ej.imagen} alt={ej.nombre} className="w-60 h-40 object-cover rounded-lg" />
          <h2 className="text-xl font-semibold">{ej.nombre}</h2>
          <p className="text-gray-700">{ej.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default EjerciciosPorEdad;
