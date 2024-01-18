import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import TotalOrderListTable from "./TotalOrderListTable";
import navLogo from "../../../assets/logos/logo.png";
import { UserContext } from "../../../App";

const TotalOrderList = () => {
  const [loggedInUser] = useContext(UserContext);
  const [totalOrders, setTotalOrders] = useState([]);
  useEffect(() => {
    fetch("https://agency-server-git-main-taher-39.vercel.app/order/get-total-orders")
      .then((res) => res.json())
      .then((data) => {
        setTotalOrders(data);
      });
  }, []);
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
            <h2>Total Order List</h2>
          </div>
          <div>
            <Link
              className="nav-link login btn user-name-link"
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
          </div>
        </div>
      </div>

      <div className="row" style={{ height: "100vh" }}>
        <div className="left-side col-md-2 btn-bg">
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light rounded p-5">
          <div>
            {totalOrders.length ? (
              <TotalOrderListTable
                totalOrders={totalOrders}
              ></TotalOrderListTable>
            ) : (
              <h4 className="text-center pt-5 text-secondary">Loading...</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalOrderList;
