import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import navLogo from "../../../assets/logos/logo.png";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";

const UserOrderDetails = () => {
  const history = useHistory()
  const { loggedInUser } = useContext(UserContext);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    fetch(`https://agency-server-git-main-taher-39.vercel.app/order/get-order-details/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrderDetails(data))
      .catch((error) => {
        console.error("Error fetching order details:", error);
        toast.error("Error fetching order details");
      });
  }, [orderId]);

  let statusColor = "";

  switch (orderDetails?.status) {
    case "pending":
      statusColor = "text-warning";
      break;
    case "processing":
      statusColor = "text-info";
      break;
    case "done":
      statusColor = "text-success";
      break;
    default:
      statusColor = "text-dark";
  }

  const handleServiceClick = () => {
    history.push("/contact-screen");
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
          <Sidebar />
        </div>
        <div className="right-side col-md-10 bg-light rounded p-5">

          <div>
            <h2>Order Details</h2>
            <h5>Our {orderDetails?.serviceName} team work for your order. Any if have query   <Link
              className="btn btn-bg text-light"
              onClick={handleServiceClick}
            >
              contact us
            </Link></h5>
            <div>
              <p><b>Name:</b> {orderDetails?.name}</p>
              <p><b>Email:</b> {orderDetails?.email}</p>
              <p><b>Description:</b> {orderDetails?.description}</p>
              <p><b>Status:</b> <span className={`${statusColor}`}>{orderDetails?.status}</span></p>
              <p><b>Service:</b> {orderDetails?.serviceName}</p>
              <p><b>Option:</b> {orderDetails?.optionName}</p>
              <p><b>Price:</b> {orderDetails?.price} tk</p>
              <p><b>Order Date:</b> {orderDetails?.orderDate}</p>
              <p><b>Delivery Into:</b> {orderDetails?.duration} Days</p>

              <Link to='/userOrders' className='btn btn-outline-danger' >Back Total Order Screen</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;
