import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useRouteError,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ProductsIndexPage } from "./pages/ProductsIndexPage";
import { ProductsShowPage } from "./pages/ProductsShowPage";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mini-capstone-api-mhoi.onrender.com";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <main className="py-3">
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </>
    ),
    errorElement: <ErrorBooundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/products",
        element: <ProductsIndexPage />,
        loader: () =>
          axios.get("/products.json").then((response) => response.data),
      },
      {
        path: "/products/:id",
        element: <ProductsShowPage />,
        loader: ({ params }) =>
          axios
            .get(`/products/${params.id}.json`)
            .then((response) => response.data),
      },
    ],
  },
]);

function ErrorBooundary() {
  let error = useRouteError();
  console.error("The ERROR IS", error, error.response.status);
  if (error?.response?.status === 401) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>Dang!</div>;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
