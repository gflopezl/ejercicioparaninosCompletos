import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const tiposCategoria = [
  { value: '', label: 'Selecciona tipo' },
  { value: 'fuerza', label: 'Fuerza' },
  { value: 'coordinación', label: 'Coordinación' },
  { value: 'equilibrio', label: 'Equilibrio' },
  { value: 'respiración', label: 'Respiración' },
  { value: 'concentración', label: 'Concentración' },
  { value: 'otro', label: 'Otro' },
];

function Categoria() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', tipo: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tipo) {
      alert('Por favor selecciona un tipo de categoría');
      return;
    }
    try {
      if (modoEdicion) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/${idEditando}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('✏️ Categoría actualizada');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('✅ Categoría creada');
      }
      setForm({ nombre: '', descripcion: '', tipo: '' });
      setModoEdicion(false);
      setIdEditando(null);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  };

  const editarCategoria = (categoria) => {
    setForm({ nombre: categoria.nombre, descripcion: categoria.descripcion, tipo: categoria.tipo });
    setModoEdicion(true);
    setIdEditando(categoria._id);
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('🗑️ Categoría eliminada');
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Gestión de Categorías de Ejercicios</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre categoría"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción (opcional)"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          {tiposCategoria.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            modoEdicion ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {modoEdicion ? '✏️ Actualizar Categoría' : '➕ Crear Categoría'}
        </button>
      </form>

      <div>
        {categorias.length === 0 ? (
          <p className="text-gray-500">No hay categorías aún.</p>
        ) : (
          categorias.map((cat) => (
            <div key={cat._id} className="border p-3 rounded mb-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{cat.nombre}</h3>
                <p className="text-gray-600 text-sm">{cat.descripcion}</p>
                <p className="text-sm italic text-gray-400">Tipo: {cat.tipo}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarCategoria(cat)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarCategoria(cat._id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/administrador')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          🔙 Volver al Panel de Administrador
        </button>
      </div>
    </div>
  );
}

export default Categoria;
