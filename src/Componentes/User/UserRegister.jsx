import React, { useState } from "react";
import Swal from "sweetalert2";

const UserRegister = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");

  const manejadorFormulario = async (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completar todos los campos");
      return;
    }

    // Validamos que los campos del email coincidan
    if (email !== emailConfirmacion) {
      setError("El mail ingresado no coincide");
      return;
    }

    try {
      // Realizamos la solicitud de registro al servidor
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          telefono,
          email,
        }),
      });

      if (response.ok) {
        // Registro exitoso, limpiamos los campos y mostramos la alerta
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Exitoso!!!</strong>",
          html:
            "<i>El usuario <strong>" +
            nombre +
            " " +
            apellido +
            " </strong>  fue agregado correctamente en el listado</i>",
          icon: "success",
        });
      } else {
        // Manejar el caso de error en la respuesta del servidor
        setError("Error al registrar el usuario");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const limpiarCampos = () => {
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setEmailConfirmacion("");
    setError("");
  };

  return (
    <div>
      <h2>Registro</h2>

      <form onSubmit={manejadorFormulario}>
        <div>
          <label htmlFor="">Nombre</label>
          <input type="text" onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div>
          <label htmlFor="">Apellido</label>
          <input type="text" onChange={(e) => setApellido(e.target.value)} />
        </div>

        <div>
          <label htmlFor="">Telefono</label>
          <input type="text" onChange={(e) => setTelefono(e.target.value)} />
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="">Email Confirmacion</label>
          <input
            type="email"
            onChange={(e) => setEmailConfirmacion(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn btn-success" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
