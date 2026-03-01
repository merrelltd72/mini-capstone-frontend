import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
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
      <Form>
        <ProductsNew onCreate={handleCreate} />
      </Form>
    </div>
  );
};

export default ProductsNewPage;
