import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  const notifyError = (errorMessage) => {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // style: {
      //   background: "#d9534f", // Background color for error
      //   color: "#fff", // Text color for error
      // },
      className: "toast-error",
    });
  };

  const fetchData = async () => {
    try {
      // recuperamos el token
      const token = localStorage.getItem("token");

      // chequeamos si el token existe
      const headers = token
        ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" };

      // solicito a la API
      const response = await fetch("http://localhost:3000/api/users", { headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `${data.status}, ${data.error}`);
      }

      setUsers(data);
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <ToastContainer />
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
