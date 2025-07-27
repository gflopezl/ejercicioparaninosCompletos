import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function NotificacionesAdmin() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  const cargarNotificaciones = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notificaciones`);
      setNotificaciones(res.data);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const limpiarFormulario = () => {
    setTitulo('');
    setMensaje('');
    setEditandoId(null);
  };

  const guardarNotificacion = async () => {
    if (!titulo.trim() || !mensaje.trim()) {
      alert('Ingrese título y mensaje');
      return;
    }
    try {
      if (editandoId) {
        await axios.put(`${API_URL}/api/notificaciones/${editandoId}`, { titulo, mensaje });
      } else {
        await axios.post(`${API_URL}/api/notificaciones`, { titulo, mensaje });
      }
      limpiarFormulario();
      cargarNotificaciones();
    } catch (error) {
      console.error('Error al guardar notificación:', error);
      alert('Error al guardar la notificación');
    }
  };

  const editarNotificacion = (noti) => {
    setTitulo(noti.titulo);
    setMensaje(noti.mensaje);
    setEditandoId(noti._id);
  };

  const eliminarNotificacion = async (id) => {
    if (!window.confirm('¿Eliminar esta notificación?')) return;
    try {
      await axios.delete(`${API_URL}/api/notificaciones/${id}`);
      cargarNotificaciones();
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      alert('Error al eliminar la notificación');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Administrar Notificaciones</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Mensaje"
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          rows={3}
        />
        <button
          onClick={guardarNotificacion}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>
        {editandoId && (
          <button
            onClick={limpiarFormulario}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>

      <ul>
        {notificaciones.map(noti => (
          <li key={noti._id} className="border p-3 mb-2 rounded shadow flex justify-between items-center">
            <div>
              <strong>{noti.titulo}</strong>
              <p>{noti.mensaje}</p>
              <small className="text-gray-500 italic">
                {new Date(noti.creadaEn || noti.createdAt).toLocaleString()}
              </small>
            </div>
            <div>
              <button
                onClick={() => editarNotificacion(noti)}
                className="text-yellow-600 hover:underline mr-4"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarNotificacion(noti._id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/administrador')}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ⬅ Volver al Administrador
      </button>
    </div>
  );
}

export default NotificacionesAdmin;
