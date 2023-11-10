import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setusers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ul>
      {users.map((user) => {
        return <li> {user.email}</li>;
      })}
    </ul>
  );
};

export default UserPage;
