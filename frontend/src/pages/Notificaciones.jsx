import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const obtenerNotificaciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/notificaciones/mis-notificaciones`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotificaciones(response.data);
      } catch (err) {
        console.error('Error al obtener notificaciones:', err);
        setError('No se pudieron cargar las notificaciones');
      }
    };

    obtenerNotificaciones();
  }, []);

  return (
    <div>
      <h2>Mis Notificaciones</h2>
      {error && <p>{error}</p>}
      {notificaciones.length === 0 ? (
        <p>No tienes notificaciones</p>
      ) : (
        <ul>
          {notificaciones.map((noti) => (
            <li key={noti._id}>
              <p>{noti.mensaje}</p>
              <small>{new Date(noti.fecha).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notificaciones;
