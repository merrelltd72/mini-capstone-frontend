export function ProductsIndex({ products, onShow }) {
  return (
    <div id="products-index">
      <h1>All products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.primary_image_url} alt="" />
            <div>
              <h2>{product.name}</h2>
              <div>
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
              </div>
              <button onClick={() => onShow(product)}>More info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
