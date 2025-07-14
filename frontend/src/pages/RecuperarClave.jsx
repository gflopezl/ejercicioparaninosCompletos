import { useState } from "react";

export default function RecuperarClave() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const respuesta = await fetch("/api/usuarios/recuperar", {  // <- ruta backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) throw new Error(data.error || "Error al enviar enlace");

      setMensaje("Revisa tu correo, te enviamos un enlace para restablecer la clave.");
      setCorreo("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Recuperar Contraseña</h2>
      <form onSubmit={manejarEnvio}>
        <label className="block mb-2">
          Correo electrónico:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar enlace de recuperación
        </button>
      </form>
      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
