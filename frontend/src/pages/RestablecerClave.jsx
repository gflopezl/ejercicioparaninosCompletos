import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RestablecerClave() {
  const { token } = useParams();
  const [nuevaClave, setNuevaClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const enviarClave = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const resp = await fetch(`/api/usuarios/restablecer-clave/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevaClave }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "No se pudo cambiar la clave");

      setMensaje("Clave actualizada correctamente. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Restablecer Clave</h2>
      <form onSubmit={enviarClave}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaClave}
          onChange={(e) => setNuevaClave(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded"
        />
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cambiar clave
        </button>
      </form>
      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
