import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import UserOrderCard from "./UserOrderCard";

const UserOrderList = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    fetch("https://agency-server-git-main-taher-39.vercel.app/order/get-user-orders?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setUserOrders(data));
  }, [loggedInUser.email]);

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
            <h2>Service List</h2>
          </div>
          <div>
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg" style={{ height: "100vh" }}>
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light rounded p-5">
          <div className="row">
            {userOrders.length ? (
              userOrders.map((order) => (
                <UserOrderCard order={order} key={order._id}></UserOrderCard>
              ))
            ) : (
              <h4 className="text-center pt-5 text-secondary">Loading...</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderList;
