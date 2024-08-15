export function ProductsIndex({ products, onShow }) {
  return (
    <div>
      <h1>All Products</h1>
      console.log(products);
      <div>
        {products.map((product) => {
          <div key={product.id}>
            <img src={product.primary_image_url} />
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => onShow(product)}>More Info</button>;
          </div>;
        })}
      </div>
    </div>
  );
}
