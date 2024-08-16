import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ProductsShow } from "../components/ProductsShow";

export function ProductsShowPage() {
  const navigate = useNavigate();
  const product = useLoaderData();
  console.log("PRODUCTS!!!", product);

  const handleUpdate = (id, params) => {
    axios.patch(`/products/${id}.json`, params).then(() => {
      navigate("/products");
    });
  };

  const handleDestroy = (id) => {
    axios.delete(`/products/${id}.json`).then(() => {
      navigate("/products");
    });
  };

  const handleCreateCartedProduct = (params) => {
    axios.post("/carted_products.json", params).then(() => {
      navigate("/carted_products");
    });
  };

  return (
    <div>
      <ProductsShow
        product={product}
        onUpdate={handleUpdate}
        onDestroy={handleDestroy}
        onCreateCartedProduct={handleCreateCartedProduct}
      />
    </div>
  );
}
