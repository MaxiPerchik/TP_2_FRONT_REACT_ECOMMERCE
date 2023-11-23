import React from "react";
import NavBar from "./Componentes/NavBar/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./Componentes/User/UserPage";
import UserRegister from "./Componentes/User/UserRegister";
import UserLogin from "./Componentes/User/UserLogin";
import ProductPage from "./Componentes/Product/ProductPage";
import ProductDetail from "./Componentes/Product/ProductDetail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/users" element={<UserPage />} />
          <Route path="/" element={<ProductPage />} />
          <Route path="/product/:name" element = { <ProductDetail />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
