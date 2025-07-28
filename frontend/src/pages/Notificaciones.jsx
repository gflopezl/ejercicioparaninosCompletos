import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const obtenerNotificaciones = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendUrl}/api/notificaciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotificaciones(res.data);
      setError('');
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
      setError('No se pudieron cargar las notificaciones');
      setNotificaciones([]);
    }
  };

  useEffect(() => {
    obtenerNotificaciones();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-blue-300">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 drop-shadow">
        🔔 Mis Notificaciones
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {notificaciones.length === 0 && !error ? (
        <p className="text-gray-500 italic text-center">No tienes notificaciones</p>
      ) : (
        <ul className="space-y-4 max-h-80 overflow-y-auto">
          {notificaciones.map((noti) => (
            <li
              key={noti._id}
              className="bg-blue-100 border-l-8 border-blue-500 p-4 rounded-xl shadow text-blue-900 font-medium"
            >
              📢 {noti.mensaje}
              <br />
              <small className="text-blue-700 font-normal">
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
