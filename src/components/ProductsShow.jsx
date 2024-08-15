const ProductsShow = ({
  product,
  onUpdate,
  onDestroy,
  onCreateCartedProduct,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    onUpdate(product.id, params, () => e.target.reset());
  };

  const handleSubmitCartedProduct = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    onCreateCartedProduct(params);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={product.name} name="name" type="text" />
        </div>
        <div>
          Price: <input defaultValue={product.price} name="price" type="text" />
        </div>
        <div>
          Description:{" "}
          <input
            defaultValue={product.description}
            name="description"
            type="text"
          />
        </div>
        <button>Update</button>
      </form>
      <button onClick={() => onDestroy(product.id)}>Destroy</button>
    </div>
  );
};

export default ProductsShow;
