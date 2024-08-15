import axios from "axios";
import { useState, useEffect } from "react";
import ProductsIndex from "../components/ProductIndex";
import ProductsNew from "./ProductsNew";
import ProductsShow from "../components/ProductsShow";
import Modal from "../components/Modal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isShowVisible, setIsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndex = () => {
    axios.get("http://localhost:3000/products.json").then((response) => {
      setProducts(response.data);
    });
  };

  const handleCreate = (params, successCallback, failureCallback) => {
    axios
      .post("http://localhost:3000/products.json", params)
      .then((response) => {
        setProducts([...products, response.data]);
        successCallback();
      })
      .catch((error) => {
        if (error.response.data.errors) {
          failureCallback(error.response.data.errors);
        }
      });
  };

  const handleShow = (product) => {
    setIsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleDestroy = (id) => {
    axios.delete(`http://localhost:3000/products/${id}.json`).then(() => {
      setProducts(products.filter((product) => product.id !== id));
      setIsShowVisible(false);
    });
  };

  const handleUpdate = (id, params, successCallback) => {
    axios
      .patch(`http://localhost:3000/products/${id}.json`, params)
      .then((response) => {
        setProducts(
          products.map((product) => {
            if (product.id === id) {
              return response.data;
            } else {
              return product;
            }
          })
        );
        successCallback();
        setIsShowVisible(false);
      });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate} />
      <ProductsIndex products={products} onShow={handleShow} />
      <Modal show={isShowVisible} onClose={() => setIsShowVisible(false)}>
        <ProductsShow
          product={currentProduct}
          onUpdate={handleUpdate}
          onDestroy={handleDestroy}
        />
      </Modal>
    </main>
  );
};

export default ProductsPage;
