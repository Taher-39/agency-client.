import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";
import navLogo from "../../images/logos/logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        var newUser = { name: user.displayName, email: user.email };
        setLoggedInUser(newUser);
        history.replace(from);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/auth/login", {
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
                Sign In
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
                  className="btn btn-primary btn-block mt-3"
                >
                  Sign In
                </button>
              </form>
              <div className="row py-3">
                <div className="col">
                  New Customer? <Link to="/register">Register</Link>
                </div>
              </div>
              <button
                onClick={handleSignIn}
                className="btn btn-danger btn-block my-3"
              >
                Google SignIn
              </button>
              <Link to="/" className="btn btn-outline-success btn-block mx-3">
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
