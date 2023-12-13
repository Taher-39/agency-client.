import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const registerData = {
        name,
        email,
        password,
      };
      fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setLoggedInUser(data);
            history.replace(from);
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <div>
      <div className="text-center py-4">
        <img src={navLogo} alt="" style={{ width: "150px" }} />
      </div>
      <div className=" rounded py-5 my-0 mx-auto w-50 shadow">
        <h1 className="ms-5">Sign Up</h1>

        <form onSubmit={submitHandler} className="ms-5">
          <div className="mb-2" controlId="name">
            <label for="floatingTextarea">Name</label>
            <input
              className="form-control w-75"
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="mb-2" controlId="email">
            <label for="floatingTextarea">Email</label>
            <input
              className="form-control w-75"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="mb-2" controlId="password">
            <label for="floatingTextarea">Password</label>
            <input
              className="form-control w-75"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div controlId="confirmPassword">
            <label for="floatingTextarea">Confirm Password</label>
            <input
              className="form-control w-75"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          <button type="submit" className="btn btn-outline-success mt-3 ">
            Register
          </button>
        </form>

        <div className="row py-3 ms-5">
          <span>
            Have an Account? <Link to="/signUp">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
