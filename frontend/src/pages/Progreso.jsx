import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaDumbbell, FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Progreso.css'; // Asegúrate de tener este archivo para estilos

function Progreso() {
  const [progresos, setProgresos] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate(); // Para navegación

  useEffect(() => {
    const correoGuardado = localStorage.getItem('correo');
    setCorreo(correoGuardado);

    if (correoGuardado) {
      // ✅ URL corregida al backend real
      axios.get(`http://localhost:10000/api/usuarios/correo/${correoGuardado}`)
        .then(res => {
          const usuario = res.data;
          setUsuarioId(usuario._id);
          return axios.get(`http://localhost:10000/api/progreso/usuario/${usuario._id}`);
        })
        .then(resProgreso => {
          setProgresos(resProgreso.data);
        })
        .catch(err => {
          console.error('Error al obtener progreso o usuario:', err);
        });
    }
  }, []);

  return (
    <div className="progreso-container">
      <h1 className="titulo">🌟 Tu Progreso 🌟</h1>
      {progresos.length > 0 ? (
        <div className="tarjetas">
          {progresos.map((progreso, index) => (
            <div key={index} className="tarjeta">
              <FaDumbbell className="icono-ejercicio" />
              <h3>{progreso.ejercicio?.nombre || 'Ejercicio'}</h3>
              <p><strong>Descripción:</strong> {progreso.ejercicio?.descripcion}</p>
              <p><strong>Repeticiones:</strong> {progreso.repeticionesRealizadas}</p>
              <p><strong>Fecha:</strong> {new Date(progreso.fecha).toLocaleDateString()}</p>
              <div className="recompensa">
                <FaStar className="estrella" />
                <FaMedal className="medalla" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mensaje-vacio">Todavía no tienes ejercicios registrados. ¡A moverse! 💪</p>
      )}

      {/* 🔙 Botón para volver */}
      <button className="boton-volver" onClick={() => navigate(-1)}>⬅️ Volver</button>
    </div>
  );
}

export default Progreso;
