import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubirEjercicio() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    edadRecomendada: '',
  });
  const [archivo, setArchivo] = useState(null);
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
    if (archivo) dataForm.append('archivo', archivo);

    try {
      await axios.post('http://localhost:3000/api/ejercicios', dataForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Ejercicio subido con éxito');
      navigate('/admin');
    } catch (error) {
      console.error('❌ Error al subir el ejercicio:', error);
      alert('Error al subir el ejercicio');
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📤 Subir nuevo ejercicio</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-md w-full space-y-4">
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
          placeholder="Descripción del ejercicio"
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
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">
          🚀 Subir ejercicio
        </button>
      </form>
    </div>
  );
}

export default SubirEjercicio;
