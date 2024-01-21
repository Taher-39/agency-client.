import { useState } from "react";
import { Link } from "react-router-dom";
import navLogo from "../../../assets/logos/logo.png";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

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
        if (data.message) {
          toast.success(data.message);
          setVerificationMessage("Verification email sent. Please check your inbox and click the verification link to complete registration.");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
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
            {verificationMessage && (
              <div className="row mt-3">
                <div className="col text-center">
                  <p>{verificationMessage}</p>
                </div>
              </div>
            )}
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  required
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
                  required
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
                  required
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
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-bg text-light btn-block"
              >
                Register
              </button>
            </form>
            <div className="row mt-3">
              <div className="col text-center">
                Have an Account? <Link to="/login" className='text-decoration-none'>Login</Link>
                <Link to="/" className='mx-2 btn btn-outline-success'>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
