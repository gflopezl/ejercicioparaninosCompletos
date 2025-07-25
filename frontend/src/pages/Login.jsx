import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // URL del backend desde variable de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${backendUrl}/api/usuarios/login`, {
        correo,
        contraseña,
      });

      console.log('Respuesta del backend:', response.data);

      // Según tu respuesta: el token, rol, nombre e id están en response.data directamente
      const { token, rol, nombre, id } = response.data;

      // Normaliza el rol para evitar problemas con mayúsculas o espacios
      const rolNormalizado = (rol || '').toLowerCase().trim();
      console.log('Rol recibido y normalizado:', rolNormalizado);

      // Guarda en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rolNormalizado);
      localStorage.setItem('usuarioId', id);
      localStorage.setItem('nombre', nombre);

      // Redirige según rol
      if (rolNormalizado === 'admin') {
        navigate('/administrador');
      } else {
        navigate('/perfilusuario');
      }
    } catch (error) {
      setError('Correo o clave incorrecta.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-200 via-sky-100 to-rose-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white border-4 border-yellow-300 rounded-[30px] shadow-xl px-10 py-10 flex flex-col items-center w-full max-w-xs h-[520px]"
      >
        <h1 className="text-3xl font-bold text-[#f67c1b] mb-8 text-center drop-shadow-sm">
          🎈 Inicia sesión
        </h1>

        <div className="mb-6 flex flex-col items-start w-full">
          <label className="flex items-center gap-2 text-[#4da9f0] font-semibold text-lg mb-1">
            📧 Correo
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 text-base border-2 border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 flex flex-col items-start w-full relative">
          <label className="flex items-center gap-2 text-[#4da9f0] font-semibold text-lg mb-1">
            🔒 Clave
          </label>
          <input
            type={mostrarClave ? 'text' : 'password'}
            placeholder="Tu clave"
            className="w-full px-4 py-2 text-base border-2 border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 pr-10"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarClave(!mostrarClave)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={mostrarClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {mostrarClave ? '🙈' : '👁️'}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-[#fbc531] text-white font-bold py-2 px-8 rounded-full hover:bg-yellow-400 transition text-lg mb-6 shadow"
        >
          🚀 Iniciar
        </button>

        <Link to="/registro" className="text-sm text-blue-800 hover:underline mb-1">
          ¿No tienes cuenta? Regístrate
        </Link>
      </form>
    </div>
  );
}

export default Login;
