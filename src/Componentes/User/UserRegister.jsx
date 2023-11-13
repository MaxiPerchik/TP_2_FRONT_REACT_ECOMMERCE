import React, { useState } from "react";
import Swal from "sweetalert2";

const UserRegister = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (
      !nombre ||
      !apellido ||
      !telefono ||
      !email ||
      !emailConfirmacion ||
      !password
    ) {
      setError("Por favor completar todos los campos");
      return;
    }

    // Validamos que los campos del email coincidan
    if (email !== emailConfirmacion) {
      setError("El mail ingresado no coincide");
      return;
    }

    const user = {
      username: nombre + apellido,
      email: email,
      password: password,
    };

    console.log({ ...user });

    try {
      // Realizamos la solicitud de registro al servidor
      console.log("entras o no?");
      const response = fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });

      if (response) {
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
    setPassword("");
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

        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
