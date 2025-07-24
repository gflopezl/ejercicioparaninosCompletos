import { useParams } from 'react-router-dom';
import EjerciciosPantalla from './EjerciciosPantalla.jsx';

function EjercicioWrapper() {
  const { ejercicioId } = useParams();
  const usuarioId = localStorage.getItem('usuarioId'); // o donde guardes el id del usuario

  if (!usuarioId) return <p>Debes iniciar sesión para ver este ejercicio.</p>;

  return <Ejercicio ejercicioId={ejercicioId} usuarioId={usuarioId} />;
}

export default EjercicioWrapper;
