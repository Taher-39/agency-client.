import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      <div>
        <div style={{ backgroundColor: "#FBD062" }} className="dashboard-top">
          <div className="d-sm-flex justify-content-around py-4">
            <div>
              <Link to="/">
                <img src={navLogo} style={{ width: "150px" }} alt="" />
              </Link>
            </div>
            <div className="page-name">
              <h2>Dashboard</h2>
            </div>
            <div>
              <Link
                className="nav-link login btn user-name-link"
                style={{ color: "#fff", padding: "10px 30px" }}
                to="/signUp"
              >
                {loggedInUser.name ? (
                  <div>
                    <span>{loggedInUser.name}</span>
                  </div>
                ) : (
                  "SignUp"
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "100vh" }}>
        <div className="left-side col-md-2 btn-bg">
          <div>
            <Sidebar></Sidebar>
          </div>
        </div>
        <div className="right-side col-md-10 bg-light p-5">
          <h3>WellCome {loggedInUser.name}</h3>
          <div className="col-md-4 pt-5 bg-light ">
            <h5>
              Available Wallet Balance:{" "}
              <span>
                {loggedInUser.amount == 0 ? 0 : loggedInUser.amount} TK
              </span>
            </h5>
          </div>
          <div className="bg-light rounded container p-4 shadow mt-4">
            <h2>Payment Information</h2>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Amount(TK)</th>
                  <th>Date</th>
                  <th>Tranaction Id</th>
                </tr>
              </thead>
              <tbody>
                {loggedInUser?.paymentInfo?.map((item, index) => (
                  <tr key={item._id} className="m-3 p-3">
                    <td>{index + 1}</td>
                    <td>{item.payableAmount}</td>
                    <td>{item.pay_initiat}</td>
                    <td>{item.tran_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="print-button">
              <button
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
