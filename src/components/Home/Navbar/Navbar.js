import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import navLogo from "../../../assets/logos/logo.png";
import "./Navbar.css";
const Navbar = () => {
  const {loggedInUser} = useContext(UserContext);
  return (
    <div className="header-bg">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={navLogo} style={{ width: "150px" }} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse link" id="navbarNav">
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link nav-link-border active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-border" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-border" to="/join-us">
                 Join Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-border" to="/our-teams">
                  Our-Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link login btn"
                  style={{ color: "#fff", padding: "10px 30px" }}
                  to="/login"
                >
                  {loggedInUser.name ? (
                    <div>
                      <span>{loggedInUser.name}</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
