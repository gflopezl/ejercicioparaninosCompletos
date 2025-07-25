import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Progreso() {
  const [progresos, setProgresos] = useState([]);
  const [form, setForm] = useState({
    usuarioId: '',
    ejercicioId: '',
    repeticiones: '',
    fecha: '',
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const navigate = useNavigate();

  const obtenerProgresos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/progresos`);
      setProgresos(res.data);
    } catch (error) {
      console.error('Error al obtener progresos:', error);
    }
  };

  useEffect(() => {
    obtenerProgresos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/progresos/${idEditando}`, form);
        alert('✏️ Progreso editado');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/progresos`, form);
        alert('✅ Progreso registrado');
      }

      setForm({ usuarioId: '', ejercicioId: '', repeticiones: '', fecha: '' });
      setModoEdicion(false);
      obtenerProgresos();
    } catch (error) {
      console.error('Error al guardar progreso:', error);
    }
  };

  const eliminarProgreso = async (id) => {
    if (!confirm('¿Eliminar este progreso?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/progresos/${id}`);
      alert('🗑️ Progreso eliminado');
      obtenerProgresos();
    } catch (error) {
      console.error('Error al eliminar progreso:', error);
    }
  };

  const cargarParaEditar = (progreso) => {
    setModoEdicion(true);
    setIdEditando(progreso._id);
    setForm({
      usuarioId: progreso.usuarioId,
      ejercicioId: progreso.ejercicioId,
      repeticiones: progreso.repeticiones,
      fecha: progreso.fecha.split('T')[0],
    });
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        📈 Gestión de Progreso
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-8 space-y-4">
        <input type="text" name="usuarioId" placeholder="ID del Usuario" value={form.usuarioId} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="ejercicioId" placeholder="ID del Ejercicio" value={form.ejercicioId} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="repeticiones" placeholder="Repeticiones" value={form.repeticiones} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className={`w-full py-2 rounded text-white ${modoEdicion ? 'bg-yellow-500' : 'bg-green-500'} hover:opacity-90`}>
          {modoEdicion ? '✏️ Editar Progreso' : '➕ Registrar Progreso'}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {progresos.map((prog) => (
          <div key={prog._id} className="bg-white shadow-md rounded p-4 space-y-2">
            <h3 className="text-lg font-semibold text-green-600">👤 Usuario ID: {prog.usuarioId}</h3>
            <p className="text-gray-700">🏋️ Ejercicio ID: {prog.ejercicioId}</p>
            <p className="text-gray-700">🔢 Repeticiones: {prog.repeticiones}</p>
            <p className="text-gray-500">📅 Fecha: {new Date(prog.fecha).toLocaleDateString()}</p>

            <div className="flex gap-2">
              <button onClick={() => cargarParaEditar(prog)} className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded">✏️ Editar</button>
              <button onClick={() => eliminarProgreso(prog._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">🗑️ Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button onClick={() => navigate('/administrador')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          🔙 Volver al Panel de Administrador
        </button>
      </div>
    </div>
  );
}

export default Progreso;
