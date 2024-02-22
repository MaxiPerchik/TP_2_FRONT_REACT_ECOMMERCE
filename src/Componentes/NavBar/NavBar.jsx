import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (isLoggedIn) {
      const decodedToken = decodeToken(token);
      const userRole = decodedToken.role;

      const isAdmin = userRole === "admin";

      setAdmin(isAdmin);
      console.log(isAdmin);
    }
  }, [isLoggedIn]);

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Update the state to trigger a re-render
    setIsLoggedIn(false);
  };

  function decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  return (
    <header className="bg-dark text-white">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img
                src={"../img/logo.png"}
                alt="Logo Tienda Mueble Online"
                className="logo-icon"
              />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    <Link to="/">Home</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <NavLink to="/register">Registro</NavLink>
                  </a>
                </li>
                <li className="nav-item">
                  {isLoggedIn ? (
                    <button className="nav-link" onClick={logout}>
                      Logout
                    </button>
                  ) : (
                    <a className="nav-link">
                      <NavLink to="/login">Login</NavLink>
                    </a>
                  )}
                </li>

                <li className="nav-item">
                  <a className="nav-link">
                    <NavLink to="/users">See Users</NavLink>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
