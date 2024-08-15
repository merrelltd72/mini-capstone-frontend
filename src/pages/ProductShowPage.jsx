import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductsShow from "../components/ProductsShow";

const ProductShowPage = () => {
  const navigate = useNavigate();
  const product = useLoaderData();

  const handleUpdate = (id, params) => {
    axios
      .patch(`http://localhost:3000/products/${id}.json`, params)
      .then(() => {
        navigate("/products");
      });
  };

  handlDestroy = (id) => {
    axios.delete(`http://localhost:3000/products/${id}.json`).then(() => {
      navigate("/products");
    });
  };

  return (
    <div>
      <ProductShow
        product={product}
        onUpdate={handleUpdate}
        onDestroy={handlDestroy}
      />
    </div>
  );
};

export default ProductShowPage;
