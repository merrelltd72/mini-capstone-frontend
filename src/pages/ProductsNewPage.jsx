import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductsNew from "./ProductsNew";

const ProductsNewPage = () => {
  const navigate = useNavigate();

  const handleCreate = (params) => {
    axios
      .post("http://localhost:3000/products.json", params)
      .then((response) => {
        console.log(response);
        navigate("/");
      });
  };

  return (
    <div>
      <ProductsNew onCreate={handleCreate} />
    </div>
  );
};

export default ProductsNewPage;
