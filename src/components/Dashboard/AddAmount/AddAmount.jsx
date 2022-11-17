import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import Message from "../../Message/Message";

const AddAmount = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [token, setToken] = useState();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tokenInfo = {
      token: Number(token),
      email: loggedInUser.email,
    };
    fetch("http://localhost:4000/api/v1/addMoney", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMessage("Amount Added Successfully");
          setToken("");
        }
      })
      .catch((err) => {
        setError("Token Is Already Used, Try Another One");
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ backgroundColor: "#FBD062" }} className="dashboard-top">
        <div className="d-sm-flex justify-content-around py-4">
          <div>
            <Link to="/">
              <img src={navLogo} style={{ width: "150px" }} alt="" />
            </Link>
          </div>
          <div className="page-name">
            <h2>Add Money</h2>
          </div>
          <div>
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg sidebar-dash">
          <Sidebar />
        </div>
        <div className="right-side col-md-6 bg-light rounded p-5">
          <h1 className="mb-5">Add money in your Wallet</h1>

          {message && <Message variant="success">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}

          <form onSubmit={handleSubmit}>
            <label for="floatingTextarea">Token</label>
            <input
              className="form-control w-75 mb-3"
              type="number"
              placeholder="Input valid 8 digit token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />

            <button className="btn btn-bg text-light" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-4 pt-5 bg-light">
          <h5 className="user">
            Available Wallet Balance:{" "}
            <span>{loggedInUser.amount} TK</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AddAmount;
