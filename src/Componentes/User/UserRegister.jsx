import React, { useState } from "react";
import Swal from "sweetalert2";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    emailConfirmacion: "",
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

    const { nombre, apellido, email, emailConfirmacion, password } = formData;

    if (!(nombre && apellido && email && emailConfirmacion && password)) {
      setError("Por favor completar todos los campos");
      return;
    }

    if (email !== emailConfirmacion) {
      setError("El correo electrónico ingresado no coincide");
      return;
    }

    const user = {
      username: nombre + apellido,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Exitoso!!!</strong>",
          html: `<i>El usuario <strong>${nombre} ${apellido}</strong> fue agregado correctamente en el listado</i>`,
          icon: "success",
        });
      } else {
        const { success, error } = await response.json();
        setError(success ? "Error al registrar el usuario" : error);
      }
    } catch (error) {
      setError("Error al realizar la solicitud: " + error.message);
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const limpiarCampos = () => {
    setFormData({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      emailConfirmacion: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 col-6">
          <h2>Registro</h2>

          <form onSubmit={manejadorFormulario}>
            <div>
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="form-label">
                Telefono
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-control"
              />
            </div>

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
              <label htmlFor="emailConfirmacion" className="form-label">
                Email Confirmacion
              </label>
              <input
                type="email"
                name="emailConfirmacion"
                value={formData.emailConfirmacion}
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

export default UserRegister;
