import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import navLogo from "../../../assets/logos/logo.png";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";

const UserOrderList = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    fetch(
      "https://agency-server-git-main-taher-39.vercel.app/order/get-user-orders?email=" + loggedInUser.email
    )
      .then((res) => res.json())
      .then((data) => setUserOrders(data));
  }, [loggedInUser.email]);
  const handleOrderDetails = (e, id) => {
    e.preventDefault();
    window.location.href = `/user-order-details/${id}`;
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
          <>
            {userOrders.length ? (
              <div className="bg-light rounded container p-4 shadow">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Service Name</th>
                      <th>Description</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders?.map((item, index) => (
                      <tr key={item._id} className="m-3 p-3">
                        <td>{index + 1}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.description}</td>
                        <td>
                          <button className="text-light btn btn-bg w-50 mt-2" onClick={(e) => handleOrderDetails(e, item._id)}>Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h4 className="text-center pt-5 text-secondary">Order List Empty.</h4>
            )}
          </>

        </div>
      </div>
    </div>
  );
};

export default UserOrderList;
