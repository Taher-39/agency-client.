import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";
import navLogo from "../../assets/logos/logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    fetch("https://agency-server-git-main-taher-39.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setLoggedInUser(data.user);
          sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
          history.replace(from);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleLogout = () => {
    setLoggedInUser({});
    sessionStorage.removeItem("loggedInUser");
  };

  return (
    <div
      className="container-fluid py-5 "
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <div className="text-center">
        <img src={navLogo} alt="Logo" style={{ maxWidth: "150px" }} />
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          {loggedInUser.email ? (
            <div className="text-center">
              <button onClick={handleLogout} className="btn btn-danger my-2">
                Sign-Out
              </button>
              <Link to="/" className="btn btn-primary my-2 mx-2">
                Home
              </Link>
            </div>
          ) : (
            <div className="rounded p-4 shadow">
              <h2 className="text-center" style={{ color: "#000" }}>
                Login
              </h2>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-bg text-light btn-block mt-3"
                >
                  Login
                </button>
                <Link to="/forgot-password" className='btn btn-bg text-light mt-3 mx-3'>Forgot Password?</Link>
              </form>
              <div className="row py-3">
                <div className="col">
                  New Customer? <Link to="/register" className='text-decoration-none'>Register</Link>
                  <Link
                    to="/"
                    className="btn btn-outline-success btn-block mx-3"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
