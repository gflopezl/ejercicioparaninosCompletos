import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificacionesAdmin = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_BACKEND_URL + '/api/notificaciones';

  const obtenerNotificaciones = async () => {
    try {
      const res = await axios.get(URL);
      setNotificaciones(res.data);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  useEffect(() => {
    obtenerNotificaciones();
  }, []);

  const handleGuardar = async () => {
    if (!titulo.trim() || !mensaje.trim()) {
      alert('Por favor ingresa título y mensaje');
      return;
    }

    try {
      if (editandoId) {
        await axios.put(`${URL}/${editandoId}`, { titulo, mensaje });
      } else {
        await axios.post(URL, { titulo, mensaje });
      }
      setTitulo('');
      setMensaje('');
      setEditandoId(null);
      obtenerNotificaciones();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleEditar = (noti) => {
    setTitulo(noti.titulo);
    setMensaje(noti.mensaje);
    setEditandoId(noti._id);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta notificación?')) return;
    try {
      await axios.delete(`${URL}/${id}`);
      obtenerNotificaciones();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📢 Notificaciones Diarias</h2>

        <div className="mb-4 space-y-3">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de la notificación"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe un mensaje diario..."
            className="w-full p-2 border rounded resize-none"
            rows={3}
          />
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editandoId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>

        <ul className="space-y-3">
          {notificaciones.map((noti) => (
            <li
              key={noti._id}
              className="bg-gray-50 p-3 rounded border flex justify-between items-center"
            >
              <div>
                <strong>{noti.titulo}</strong>
                <p>{noti.mensaje}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditar(noti)}
                  className="text-yellow-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(noti._id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate('/admin')}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ⬅ Volver al Panel Administrativo
        </button>
      </div>
    </div>
  );
};

export default NotificacionesAdmin;
