import { useState } from "react";
import Form from "react-bootstrap/Form";

const ProductsNew = ({ onCreate }) => {
  const [errors, setErros] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErros([]);
    const params = new FormData(e.target);
    onCreate(
      params,
      () => e.target.reset(),
      (e) => setErros(e)
    );
  };

  return (
    <div>
      <h1>New product</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
          </Form.Group>
          <div>
            Name: <input name="name" type="text" />
          </div>
          <div>
            Price: <input name="price" type="text" />
          </div>
          <div>
            Description: <input name="description" type="text" />
          </div>
          <div>
            Image url: <input name="image_url" type="text" />
          </div>
          <div>
            Supplier id: <input name="supplier_id" type="text" />
          </div>
          <button type="submit">Create</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default ProductsNew;
