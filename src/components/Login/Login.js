import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";
import navLogo from "../../images/logos/logo.png";
import Message from "../Message/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

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
        console.log(error.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    fetch("https://protected-plateau-36631.herokuapp.com/api/v1/authUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoggedInUser(data);
          history.replace(from);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div
      className="text-center pt-5"
      style={{ minHeight: "100vh", backgroundColor: "whitesmoke" }}
    >
      <div>
        <div className="text-center  py-4">
          <img src={navLogo} alt="" style={{ width: "150px" }} />
        </div>
        <div>
          {loggedInUser.email ? (
            <div className="text-center">
              <button
                onClick={() => setLoggedInUser({})}
                className="btn btn-danger my-2 w-50"
              >
                Sign-Out
              </button>
              <br />
              <button className="btn ">
                <Link to="/">Home</Link>
              </button>
              <br />
            </div>
          ) : (
            <div className="rounded py-5 my-0 mx-auto w-50 shadow">
              <h2 style={{ color: "#000" }}>Sign In</h2>
              {error && <Message variant="danger">{error}</Message>}

              <form onSubmit={submitHandler}>
                <div controlId="email">
                  <input
                    className="form-control w-75 ms-5"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                <div controlId="password">
                  <br />
                  <input
                    className="form-control w-75 ms-5"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                  Sign In
                </button>
              </form>

              <div className="row py-3">
                <div>
                  New Customer? <Link to="/register">Register</Link>
                </div>
              </div>

              <button onClick={handleSignIn} className="btn btn-danger my-2">
                Google SignIn
              </button>
              <br />
              <button className="btn btn-outline-success my-1 px-4 text-light">
                <Link className=" text-decoration-none" to="/">
                  Home
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
