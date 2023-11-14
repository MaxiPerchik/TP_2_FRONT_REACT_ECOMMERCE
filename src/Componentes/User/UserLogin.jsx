import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const manejadorFormulario = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!(email && password)) {
      setError("Por favor completar todos los campos");
      return;
    }

    const credentials = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Guardar el token en el estado o en localStorage según tus necesidades
        // Ejemplo de guardado en el estado (usando un estado llamado 'token'):
        localStorage.setItem("token", token);
        console.log(localStorage);
        limpiarCampos();
        Swal.fire({
          title: "<strong>Login Exitoso!!!</strong>",
          html: "<i>¡Bienvenido de vuelta!</i>",
          icon: "success",
        });
        navigate('/home');

      } else {
        const { success, error } = await response.json();
        setError(success ? "Error al iniciar sesión" : error);
      }
    } catch (error) {
      setError("Error al realizar la solicitud: " + error.message);
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const limpiarCampos = () => {
    setFormData({
      email: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 col-6">
          <h2>Login</h2>

          <form onSubmit={manejadorFormulario}>
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button className="btn btn-success mt-3" type="submit">
              Registrar
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
