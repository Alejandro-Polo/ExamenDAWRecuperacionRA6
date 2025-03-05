import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormularioLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => setDatos(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioValido = datos.find(
      (user) => user.nombre === username && user.pass === password
    );

    if (usuarioValido) {
      alert("Inicio de sesión exitoso");
      localStorage.setItem("token", username);
      navigate("/Principal");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
