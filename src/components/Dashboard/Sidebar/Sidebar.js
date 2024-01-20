import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import {
  MdHome,
  MdCommentBank,
  MdDescription,
  MdOutlineAdminPanelSettings,
  MdOutlineDesignServices,
  MdOutlineDashboard,
  MdOutlineAccountTree,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import "./Sidebar.css";

const Sidebar = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(loggedInUser.isAdmin);

  useEffect(() => {
    setIsAdmin(loggedInUser.isAdmin);
  }, [loggedInUser.isAdmin]);

  return (
    <div className="py-5">
      <nav>
        <ul>
          <li className="sidebar-links pb-2">
            <Link className="sidebar-link" to="/">
              <MdHome /> Home
            </Link>
          </li>
          {isAdmin ? (
            <>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/dashboard">
                  <MdOutlineDashboard /> Dashboard
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/totalOrderList">
                  <MdDescription /> Order Lists
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/addService">
                  <FaPlus /> Add Service
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/addAdmin">
                  <MdOutlineAdminPanelSettings /> Manage Admin
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/manage-services">
                  <MdOutlineDesignServices /> Manage Services{" "}
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/account">
                  <MdOutlineAccountTree /> Account{" "}
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* <li className="sidebar-links pb-2">
                <Link
                  className="sidebar-link"
                  to="/uploadOrder/6572da2ce2a9a2de69554dab"
                >
                  <LiaHireAHelper /> Hire Us
                </Link>
              </li> */}
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/dashboard">
                  <MdOutlineDashboard /> Dashboard
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/userOrders">
                  <MdDescription /> Order List
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
              <li className="sidebar-links pb-2">
                <Link className="sidebar-link" to="/account">
                  <MdOutlineAccountTree /> Account{" "}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
