import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    correo: '',
    contraseña: '',
    rol: 'niño' // Asegúrate de que este valor esté permitido en tu backend
  });

  const [mostrarClave, setMostrarClave] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/registro', formData); // <-- usa el puerto de tu backend
      setMensaje(response.data.mensaje);
      setTimeout(() => navigate('/login'), 1500); // Redirige después de registrar
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">¡Regístrate para jugar y ejercitarte!</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {mensaje && <p className="text-green-500 text-sm mb-2">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            className="w-full p-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fechaNacimiento"
            className="w-full p-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={mostrarClave ? 'text' : 'password'}
              name="contraseña"
              placeholder="Contraseña"
              className="w-full p-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setMostrarClave(!mostrarClave)}
              className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer"
            >
              {mostrarClave ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-xl transition"
          >
            Registrarme
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
