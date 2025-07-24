import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubirEjercicio() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    edadRecomendada: '',
    repeticiones: '',
  });
  const [archivo, setArchivo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append('nombre', form.nombre);
    dataForm.append('descripcion', form.descripcion);
    dataForm.append('edadRecomendada', form.edadRecomendada);
    dataForm.append('repeticiones', form.repeticiones);
    if (archivo) dataForm.append('archivo', archivo);

    try {
      if (modoEdicion) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/ejercicios/${idEditando}`,
          dataForm,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('✏️ Ejercicio editado con éxito');
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/ejercicios`,
          dataForm,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('✅ Ejercicio creado con éxito');
      }

      setForm({ nombre: '', descripcion: '', edadRecomendada: '', repeticiones: '' });
      setArchivo(null);
      setModoEdicion(false);
      setIdEditando(null);
      navigate('/admin/ejercicios');
    } catch (error) {
  console.error('❌ Error completo:', error);

  if (error.response) {
    console.error('📡 Código de estado:', error.response.status);
    console.error('📡 error.response:', error.response);
    console.error('📡 error.response.data:', error.response.data);

    alert(
      'Error al guardar ejercicio: ' +
        (error.response.data?.error || error.response.data?.message || 'Error desconocido')
    );
  } else {
    console.error('⛔ Sin respuesta del servidor:', error.message);
    alert('Error de conexión con el servidor');
  }
}
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {modoEdicion ? 'Editar Ejercicio' : 'Crear Ejercicio'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del ejercicio"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="edadRecomendada"
          placeholder="Edad recomendada"
          value={form.edadRecomendada}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="repeticiones"
          placeholder="Repeticiones"
          value={form.repeticiones}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min={1}
        />
        {!modoEdicion && (
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full"
          />
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            modoEdicion ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {modoEdicion ? '✏️ Editar Ejercicio' : '➕ Crear Ejercicio'}
        </button>
      </form>

      {/* Botón para volver al panel */}
      <button
        onClick={() => navigate('/admin')}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ⬅️ Volver al Panel de Administrador
      </button>
    </div>
  );
}

export default SubirEjercicio;
