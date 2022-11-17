import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";

const UploadOrder = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderFile, setOrderFile] = useState();

  const { id } = useParams();

  // fetch total order
  const [service, setService] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/get-single-service/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      });
  }, []);

  const title = service[0]?.title;

  let costPrice;
  if (title == "Web Development") {
    costPrice = 5000;
  } else if (title == "Graphics-Design") {
    costPrice = 2000;
  } else if (title == "HTML to React") {
    costPrice = 3000;
  }

  const handleBlur = (e) => {
    const newOrderDetails = { ...orderDetails, status: "pending" };
    newOrderDetails[e.target.name] = e.target.value;
    setOrderDetails(newOrderDetails);
  };
  const handleFile = (e) => {
    setOrderFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    const newOrderForm = new FormData();
    newOrderForm.append("name", loggedInUser.name);
    newOrderForm.append("email", loggedInUser.email);
    newOrderForm.append("category", title);
    newOrderForm.append("description", orderDetails.projectDetails);
    newOrderForm.append("price", costPrice);
    newOrderForm.append("status", orderDetails.status);
    newOrderForm.append("file", orderFile);

    if (loggedInUser.amount >= costPrice) {
      const currentWalletcostPrice = loggedInUser.amount - costPrice;
      newOrderForm.append("newAmount", currentWalletcostPrice);

      fetch("http://localhost:4000/api/v1/uploadOrder", {
        method: "POST",
        body: newOrderForm,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert("Order Submitted, Check Service List");
          }
        });
    } else {
      alert("Your Wallet Price Is Insuficient");
    }
    e.preventDefault();
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
            <h2>Order</h2>
          </div>
          <div>
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg">
          <Sidebar />
        </div>
        <div className="right-side col-md-6 bg-light py-5 ps-5">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control w-75 mb-3"
              type="text"
              name="name"
              placeholder="Your name / company's name"
              defaultValue={loggedInUser.name}
            />
            <input
              className="form-control w-75 mb-3"
              type="email"
              name="email"
              placeholder="Your email address"
              defaultValue={loggedInUser.email}
            />
            <input
              className="form-control w-75 mb-3"
              type="text"
              name="category"
              placeholder="Graphics Design"
              defaultValue={title}
              required
            />
            <textarea
              className="form-control w-75 mb-3"
              onBlur={handleBlur}
              name="projectDetails"
              placeholder="project Details"
              cols="30"
              rows="5"
              required
            ></textarea>
            <input
              className="form-control w-75 mb-3"
              type="text"
              name="cost-price"
              placeholder="cost-price"
              defaultValue={costPrice}
              required
            />
            <input
              className="form-control w-75 mb-3"
              onChange={handleFile}
              type="file"
              name="file"
              required
            />
            <button type="submit" className="btn btn-bg text-light">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-4 pt-5 bg-light">
          <h5>
            Available Wallet Balance: <span>{loggedInUser.amount} TK</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default UploadOrder;
