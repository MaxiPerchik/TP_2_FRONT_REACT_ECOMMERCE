import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/searchNombre/${name}`
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        if (data == null) {
          setError("El producto no se encontró.");
        } else {
          setProduct(data);
        }
      } catch (error) {
        setError("Ocurrió un error al cargar el producto.");
      }
    };

    loadProduct();
  }, [name]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6 ">
          <div className="card">
            <img
              src={product.productImage}
              className="card-img-top"
              alt="..."
              style={{ maxHeight: "400px", objectFit: "fill" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div class="card-footer text-end">
                <h6>{product.productPrice}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
