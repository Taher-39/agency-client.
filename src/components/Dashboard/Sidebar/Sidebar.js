import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import {
  MdHome,
  MdAddShoppingCart,
  MdCommentBank,
  MdDescription,
  MdOutlineAdminPanelSettings,
  MdOutlineDesignServices,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import "./Sidebar.css";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/isAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-5">
      <nav>
        <ul>
          <li className="sidebar-links pb-2">
            <Link className="sidebar-link" to="/">
              <MdHome /> Home
            </Link>
          </li>
          {loading ? (
            <p className="text-light">loading...</p>
          ) : (
            <div>
              {isAdmin ? (
                <div>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/totalOrderList">
                      <MdDescription /> Order Lists
                    </Link>
                  </li>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/addService">
                      <FaPlus /> AddService
                    </Link>
                  </li>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/addAdmin">
                      <MdOutlineAdminPanelSettings /> Add-Admin
                    </Link>
                  </li>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/manage-services">
                      <MdOutlineDesignServices /> Manage Services{" "}
                    </Link>
                  </li>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/add-token">
                      <MdDescription /> Add Token{" "}
                    </Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/userOrders">
                      <MdDescription /> Service List
                    </Link>
                  </li>
                  <li className="sidebar-links pb-2">
                    <Link className="sidebar-link" to="/getUserReview">
                      <MdCommentBank /> Review
                    </Link>
                  </li>
                  <li className="sidebar-links">
                    <Link className="sidebar-link" to="/addAmount">
                      <FcMoneyTransfer /> Add Money
                    </Link>
                  </li>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
