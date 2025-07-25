import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    fechaNacimiento: '',
    rol: '',
  });
  const [idEditando, setIdEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`);
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${idEditando}`, form);
        alert('✅ Usuario actualizado');
      }
      setModoEdicion(false);
      setForm({ nombre: '', correo: '', fechaNacimiento: '', rol: '' });
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  const cargarParaEditar = (usuario) => {
    setModoEdicion(true);
    setIdEditando(usuario._id);
    setForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      fechaNacimiento: usuario.fechaNacimiento?.substring(0, 10),
      rol: usuario.rol,
    });
  };

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`);
      alert('🗑️ Usuario eliminado');
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        👥 Gestión de Usuarios Registrados
      </h1>

      {modoEdicion && (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
          <h2 className="text-xl font-semibold">✏️ Editar Usuario</h2>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="Correo"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar rol</option>
            <option value="usuario">Niño/a</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
            Guardar Cambios
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {usuarios.map((usuario) => (
          <div key={usuario._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold text-blue-700">{usuario.nombre}</h3>
            <p className="text-gray-600">📧 {usuario.correo}</p>
            <p className="text-gray-600">🎂 {new Date(usuario.fechaNacimiento).toLocaleDateString()}</p>
            <p className="text-gray-600">🔐 Rol: {usuario.rol}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => cargarParaEditar(usuario)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarUsuario(usuario._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate('/administrador')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          🔙 Volver al Panel de Administrador
        </button>
      </div>
    </div>
  );
}

export default UsuariosAdmin;
