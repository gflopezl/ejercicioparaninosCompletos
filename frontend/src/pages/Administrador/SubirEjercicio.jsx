import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const RUTA_BASE = `${API_URL}/api/ejercicioPantalla`;


function SubirEjercicio() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    repeticiones: '',
    edadRecomendada: { desde: '', hasta: '' }
  });
  const [ejercicios, setEjercicios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idActual, setIdActual] = useState('');

  // Mensajes para inputs numéricos
  const [mensajeDesde, setMensajeDesde] = useState('');
  const [mensajeHasta, setMensajeHasta] = useState('');
  const [mensajeRepeticiones, setMensajeRepeticiones] = useState('');

  // Obtener ejercicios al cargar
  const obtenerEjercicios = async () => {
    try {
      const res = await axios.get(RUTA_BASE);
      setEjercicios(res.data);
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
    }
  };

  useEffect(() => {
    obtenerEjercicios();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar solo números para campos numéricos
    if (['desde', 'hasta', 'repeticiones'].includes(name)) {
      if (value !== '' && !/^\d+$/.test(value)) {
        return; // Ignora input no numérico
      }
    }

    if (name === 'desde' || name === 'hasta') {
      setForm({
        ...form,
        edadRecomendada: {
          ...form.edadRecomendada,
          [name]: value
        }
      });

      const texto = value ? `Valor ${value} corresponde a una edad (años).` : '';
      if (name === 'desde') setMensajeDesde(texto);
      else setMensajeHasta(texto);

    } else if (name === 'repeticiones') {
      setForm({ ...form, [name]: value });
      setMensajeRepeticiones(value ? `Valor ${value} corresponde a repeticiones.` : '');
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Guardar ejercicio (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        repeticiones: form.repeticiones,
        edadRecomendada: {
          desde: form.edadRecomendada.desde,
          hasta: form.edadRecomendada.hasta,
        }
      };

      if (modoEdicion) {
        await axios.put(`${RUTA_BASE}/${idActual}`, payload);
        setModoEdicion(false);
        setIdActual('');
      } else {
        await axios.post(RUTA_BASE, payload);
      }

      setForm({
        nombre: '',
        descripcion: '',
        repeticiones: '',
        edadRecomendada: { desde: '', hasta: '' }
      });
      setMensajeDesde('');
      setMensajeHasta('');
      setMensajeRepeticiones('');

      obtenerEjercicios();
    } catch (error) {
      console.error('Error al guardar ejercicio:', error);
      alert('Error al guardar el ejercicio. Revisa la consola para más detalles.');
    }
  };

  // Editar ejercicio - carga datos al formulario
  const handleEditar = (ejer) => {
    setForm({
      nombre: ejer.nombre || '',
      descripcion: ejer.descripcion || '',
      repeticiones: ejer.repeticiones || '',
      edadRecomendada: ejer.edadRecomendada
        ? {
            desde: ejer.edadRecomendada.desde || '',
            hasta: ejer.edadRecomendada.hasta || ''
          }
        : { desde: '', hasta: '' }
    });
    setModoEdicion(true);
    setIdActual(ejer._id);

    setMensajeDesde(ejer.edadRecomendada?.desde ? `Valor ${ejer.edadRecomendada.desde} corresponde a una edad (años).` : '');
    setMensajeHasta(ejer.edadRecomendada?.hasta ? `Valor ${ejer.edadRecomendada.hasta} corresponde a una edad (años).` : '');
    setMensajeRepeticiones(ejer.repeticiones ? `Valor ${ejer.repeticiones} corresponde a repeticiones.` : '');
  };

  // Eliminar ejercicio
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este ejercicio?')) return;
    try {
      await axios.delete(`${RUTA_BASE}/${id}`);
      obtenerEjercicios();
    } catch (error) {
      console.error('Error al eliminar ejercicio:', error);
      alert('Error al eliminar el ejercicio');
    }
  };

  // Volver al panel admin
  const irAlAdministrador = () => {
    navigate('/administrador'); // Ajusta esta ruta según tu configuración
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {modoEdicion ? 'Editar Ejercicio' : 'Subir Nuevo Ejercicio'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow">
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
          name="repeticiones"
          placeholder="Repeticiones"
          value={form.repeticiones}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="1"
        />
        {mensajeRepeticiones && (
          <p className="text-sm text-green-600 italic">{mensajeRepeticiones}</p>
        )}

        <div className="flex gap-4">
          <div className="w-full">
            <input
              type="number"
              name="desde"
              placeholder="Edad desde"
              value={form.edadRecomendada.desde}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
            {mensajeDesde && (
              <p className="text-sm text-green-600 italic">{mensajeDesde}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="number"
              name="hasta"
              placeholder="Edad hasta"
              value={form.edadRecomendada.hasta}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
            {mensajeHasta && (
              <p className="text-sm text-green-600 italic">{mensajeHasta}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {modoEdicion ? 'Actualizar' : 'Guardar'}
          </button>

          <button
            type="button"
            onClick={irAlAdministrador}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ir al Administrador
          </button>
        </div>
      </form>

      <h3 className="text-lg font-semibold mt-8 mb-2">Ejercicios Subidos</h3>
      <ul className="space-y-2">
        {ejercicios.length === 0 ? (
          <p>No hay ejercicios aún.</p>
        ) : (
          ejercicios.map((ejer) => (
            <li key={ejer._id} className="border p-3 rounded shadow">
              <h4 className="font-bold">{ejer.nombre}</h4>
              <p>{ejer.descripcion}</p>
              <p className="text-sm text-gray-600">
                Repeticiones: {ejer.repeticiones} {ejer.repeticiones === '1' ? 'repetición' : 'repeticiones'}
              </p>
              <p className="text-sm text-gray-600">
                Edad recomendada: {ejer.edadRecomendada?.desde} a {ejer.edadRecomendada?.hasta} años
              </p>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEditar(ejer)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleEliminar(ejer._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑 Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SubirEjercicio;
