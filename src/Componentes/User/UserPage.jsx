import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('token');

    // Verificar si hay un token
    if (token) {
      // Configurar el encabezado de autorización con el token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      // Realizar la solicitud con el encabezado de autorización
      fetch("http://localhost:3000/api/users", { headers })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => setError(error.message));
    } else {
      // Manejar el caso en que no hay un token disponible
      setError("No se encontró un token de autenticación");
    }
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {users.map((user) => {
        return <li key={user._id}>{user.email}</li>;
      })}
    </ul>
  );
};

export default UserPage;
