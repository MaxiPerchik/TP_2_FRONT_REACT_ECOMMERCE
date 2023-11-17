import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem("token");

    // Configurar el encabezado de autorización con el token si está presente
    const headers = token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
        };

    // Realizar la solicitud con el encabezado de autorización
    fetch("http://localhost:3000/api/users", { headers })
      .then(async (response) => {
        if (!response.ok) {
          // Capturar el mensaje de error del servidor
          const data = await response.json();   
          throw new Error(data.error || "Error desconocido del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <p className="container">Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <ul className="col-8">
          {users.map((user) => (
            <li key={user._id}>{user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
