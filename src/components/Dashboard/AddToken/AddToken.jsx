import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import Message from "../../Message/Message";
import TokenCard from "./TokenCard";

const AddToken = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const tokenHandler = () => {
    let min = 10000000;
    let max = 99999999;
    setToken(Math.floor(Math.random() * (max - min + 1) + min));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tokenInfo = {
      amount: amount,
      token: token,
    };
    fetch("http://localhost:4000/api/v1/addToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMessage("Token Added Successfully");
          setToken("");
          setAmount ("");
        }
      })
      .catch((err) => setError(err.message));
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
            <h2>Add Token</h2>
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
        <div className="right-side col-md-10 bg-light rounded p-5">
          <h1>Add Token</h1>

          {message && <Message variant="success">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}

          <form onSubmit={handleSubmit}>
            <label for="floatingTextarea">Token Amount</label>
            <input
              className="form-control w-50 mb-3"
              type="number"
              placeholder="Input token amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <label for="floatingTextarea">Create Token</label>
            <input
              className="form-control w-50 mb-3"
              type="number"
              placeholder="Input token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />

            <button
              onClick={tokenHandler}
              className="btn btn-bg text-light"
              type="submit"
            >
              Generate & Submit
            </button>
          </form>

          <div className="token-info mt-4">
            <h2 className="py-4 text-center">Total Token</h2>
            <TokenCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToken;
