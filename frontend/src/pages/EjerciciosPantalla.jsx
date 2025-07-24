import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EjerciciosPantalla() {
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const obtenerEjercicios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/ejercicios/por-edad`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEjercicios(response.data);
      } catch (err) {
        console.error('Error al obtener ejercicios:', err);
        setError('No se pudieron cargar los ejercicios');
      }
    };

    obtenerEjercicios();
  }, []);

  return (
    <div>
      <h2>Ejercicios recomendados</h2>
      {error && <p>{error}</p>}
      {ejercicios.length === 0 ? (
        <p>No hay ejercicios disponibles</p>
      ) : (
        <ul>
          {ejercicios.map((ej) => (
            <li key={ej._id}>
              <h3>{ej.nombre}</h3>
              <p>{ej.descripcion}</p>
              <img src={ej.imagen} alt={ej.nombre} style={{ width: '200px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EjerciciosPantalla;

