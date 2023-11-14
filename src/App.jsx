import React from "react";
import NavBar from "./Componentes/NavBar/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./Componentes/User/UserPage";
import UserRegister from "./Componentes/User/UserRegister";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
