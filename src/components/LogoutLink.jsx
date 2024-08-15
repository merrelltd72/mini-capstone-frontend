import axios from "axios";
import { Link } from "react-router-dom";

const LogoutLink = () => {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return <Link onClick={handleClick}>Logout</Link>;
};

export default LogoutLink;
