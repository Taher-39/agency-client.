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
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(loggedInUser.isAdmin);

  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setIsAdmin(loggedInUser.isAdmin);
  }, [loggedInUser.isAdmin]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`https://agency-server-git-main-taher-39.vercel.app/auth/delete-account/${loggedInUser._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser({});
        toast.success(data.message);
        history.push("/login");
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };
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
              <li className="sidebar-links pt-2">
                <Link className="sidebar-link" to="/account">
                  <MdOutlineAccountTree /> Account{" "}
                </Link>
              </li>
              <li className="sidebar-links pb-2">
                <button
                  type="button"
                  className="btn btn-danger mt-3"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>

                {showDeleteModal && (
                  <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Confirmation</h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>Are you sure you want to delete your account?</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDeleteAccount}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
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
              <li className="sidebar-links pt-2">
                <Link className="sidebar-link" to="/account">
                  <MdOutlineAccountTree /> Account{" "}
                </Link>
              </li>
              <li className="sidebar-links">
                <button
                  type="button"
                  className="btn btn-danger mt-3"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>

                {showDeleteModal && (
                  <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Confirmation</h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>Are you sure you want to delete your account?</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDeleteAccount}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
