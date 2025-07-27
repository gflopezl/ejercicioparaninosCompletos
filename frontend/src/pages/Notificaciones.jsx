import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notificaciones({ usuarioId }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Función para obtener notificaciones filtradas por usuarioId
  const obtenerNotificacionesDelNiño = async (usuarioId) => {
    try {
      const token = localStorage.getItem('token'); // Asumiendo que usas JWT en localStorage
      const res = await axios.get(`${backendUrl}/api/notificaciones?usuarioId=${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotificaciones(res.data);
      setError('');
    } catch (error) {
      console.error('Error al cargar notificaciones para el niño:', error);
      setError('No se pudieron cargar las notificaciones');
      setNotificaciones([]);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      obtenerNotificacionesDelNiño(usuarioId);
    } else {
      setError('Usuario no identificado');
    }
  }, [usuarioId]);

  return (
    <div>
      <h2>Mis Notificaciones</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notificaciones.length === 0 && !error ? (
        <p>No tienes notificaciones</p>
      ) : (
        <ul>
          {notificaciones.map((noti) => (
            <li key={noti._id} style={{ marginBottom: '1rem' }}>
              <p>{noti.mensaje}</p>
              <small style={{ color: 'gray' }}>
                {new Date(noti.fecha || noti.creadaEn || noti.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notificaciones;
