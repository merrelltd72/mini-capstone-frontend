import { useNavigate, useLoaderData } from "react-router-dom";
import { ProductsIndex } from "../components/ProductsIndex";

export function ProductsIndexPage() {
  const navigate = useNavigate();
  const products = useLoaderData();

  const handleShow = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div>
      <ProductsIndex products={products} onShow={handleShow} />
    </div>
  );
}
