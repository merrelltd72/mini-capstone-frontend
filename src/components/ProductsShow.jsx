/* eslint-disable react/prop-types */
import { useState } from "react";

export function ProductsShow({
  product,
  onUpdate,
  onDestroy,
  onCreateCartedProduct,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState("");

  const handlePreviousImage = () => {
    const newImageIndex =
      currentImageIndex === 0
        ? product.images.length - 1
        : currentImageIndex - 1;
    setPrevImageIndex(currentImageIndex);
    setSlideDirection("slide-left");
    setCurrentImageIndex(newImageIndex);
  };

  const handleNextImage = () => {
    const newImageIndex =
      currentImageIndex === product.images.length - 1
        ? 0
        : currentImageIndex + 1;
    setPrevImageIndex(currentImageIndex);
    setSlideDirection("slide-right");
    setCurrentImageIndex(newImageIndex);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(product.id, params, () => event.target.reset());
  };

  const handleSubmitCartedProduct = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onCreateCartedProduct(params);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <div className="relative h-64 overflow-hidden">
          {prevImageIndex !== null && (
            <img
              src={product.images[prevImageIndex].url}
              alt={`Product image ${prevImageIndex + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                slideDirection === "slide-left"
                  ? "slide-out-left"
                  : "slide-out-right"
              }`}
            />
          )}
          <img
            src={product.images[currentImageIndex].url}
            alt={`Product image ${currentImageIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${slideDirection}`}
            onAnimationEnd={() => {
              setSlideDirection("");
              setPrevImageIndex(null);
            }}
          />
          <button
            onClick={handleNextImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2"
          >
            &lt;
          </button>
          <button
            onClick={handlePreviousImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2"
          >
            &gt;
          </button>
        </div>
        <form onSubmit={handleSubmitCartedProduct}>
          <div>
            <input type="hidden" name="product_id" value={product.id} />
          </div>
          <div>
            Quantity:{" "}
            <input
              className="mt-1 block w-full rounded-md border-gray-300"
              type="number"
              name="quantity"
            />
          </div>
          <button
            className="rounded border bg-white border-gray-300 p-2 hover:bg-gray-100"
            type="submit"
          >
            Add to cart
          </button>
        </form>
      </div>
      <div className="col-span-2">
        <h2 className="text-3xl font-bold underline">{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>{product.description}</p>
        <form onSubmit={handleSubmit}>
          <div>
            Name:{" "}
            <input
              className="mt-1 block w-full rounded-md border-gray-300"
              defaultValue={product.name}
              name="name"
              type="text"
            />
          </div>
          <div>
            Price:{" "}
            <input
              className="mt-1 block w-full rounded-md border-gray-300"
              defaultValue={product.price}
              name="price"
              type="text"
            />
          </div>
          <div>
            Description:{" "}
            <input
              className="mt-1 block w-full rounded-md border-gray-300"
              defaultValue={product.description}
              name="description"
              type="text"
            />
          </div>
          <button
            className="rounded border bg-white border-gray-300 p-2 hover:bg-gray-100"
            type="submit"
          >
            Update
          </button>
        </form>
        <button
          className="rounded border bg-white border-gray-300 p-2 hover:bg-gray-100"
          onClick={() => onDestroy(product.id)}
        >
          Destroy
        </button>
      </div>
      <div></div>
    </div>
  );
}
