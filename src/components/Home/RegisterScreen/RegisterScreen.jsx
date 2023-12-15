import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import navLogo from "../../../images/logos/logo.png";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

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
      fetch("https://agency-server-git-main-taher-39.vercel.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User registered successfully") {
            history.replace("/signUp");
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <div className="text-center">
        <img src={navLogo} alt="Logo" style={{ maxWidth: "150px" }} />
      </div>
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-6 ">
          <div className="rounded py-5 my-0 mx-auto shadow p-5">
            <h1 className="text-center mb-4">Register</h1>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-success btn-block"
              >
                Register
              </button>
            </form>
            <div className="row mt-3">
              <div className="col text-center">
                Have an Account? <Link to="/signUp">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
