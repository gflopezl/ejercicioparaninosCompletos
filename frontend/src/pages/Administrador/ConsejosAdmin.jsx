import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConsejosAdmin = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [consejos, setConsejos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_BACKEND_URL + '/api/consejos';

  const obtenerConsejos = async () => {
    try {
      const res = await axios.get(URL);
      setConsejos(res.data);
    } catch (error) {
      console.error('Error al cargar consejos:', error);
    }
  };

  useEffect(() => {
    obtenerConsejos();
  }, []);

  const handleGuardar = async () => {
    if (!titulo.trim() || !descripcion.trim()) return;

    try {
      if (editandoId) {
        await axios.put(`${URL}/${editandoId}`, { titulo, descripcion });
      } else {
        await axios.post(URL, { titulo, descripcion });
      }
      setTitulo('');
      setDescripcion('');
      setEditandoId(null);
      obtenerConsejos();
    } catch (error) {
      console.error('Error al guardar consejo:', error);
    }
  };

  const handleEditar = (consejo) => {
    setTitulo(consejo.titulo);
    setDescripcion(consejo.descripcion);
    setEditandoId(consejo._id);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este consejo?')) return;
    try {
      await axios.delete(`${URL}/${id}`);
      obtenerConsejos();
    } catch (error) {
      console.error('Error al eliminar consejo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">💡 Consejos Diarios</h2>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del consejo..."
            className="w-full p-2 border rounded"
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del consejo..."
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editandoId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>

        <ul className="space-y-3">
          {consejos.map((consejo) => (
            <li key={consejo._id} className="bg-gray-50 p-3 rounded border flex justify-between items-center">
              <div>
                <strong>{consejo.titulo}</strong>
                <p>{consejo.descripcion}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditar(consejo)}
                  className="text-yellow-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(consejo._id)}
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

export default ConsejosAdmin;
