import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


const ProductPage = () => {
  const [products, setProducts] = useState([]);

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
      const response = await fetch("http://localhost:3000/api/products", { headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `${data.status}, ${data.error}`);
      }

      setProducts(data);
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.map((product) => (
        <div className="col">
          <div className="card h-100">
            <img src={product.productImage} className="card-img-top" alt={product.productImage} />
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">
                {product.productPrice}
              </p>
            </div>
            <div className="card-footer">
             <Link to={`/product/${product.productName}`}>ver detalles</Link>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
