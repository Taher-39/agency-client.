import React from "react";
import { toast } from "react-toastify";

const UserOrderCard = ({ order }) => {
  
  const handleOrderDetails = (e, id) => {
    toast.success("Feature Comming Soon.")
  }

  return (
    <div className="col-md-4 col-sm-6 col-12 my-3">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-around">
            {/* <div className="img">
              <img
                style={{ width: "100%", height: "auto" }}
                src={`https://agency-server-git-main-taher-39.vercel.app/${order.file}`}
                alt=""
              />
            </div> */}
          </div>
          <h4>{order.serviceName}</h4>
          <h6>{order.optionName}</h6>
          <h4>{order.category}</h4>
          <p>{order.description}</p>

          <div className="row ">
            <h6 className="col-md-6">
              Payment: <span className="text-success">Paid</span>
            </h6>
            <h6 className="col-md-6">
              Service:{" "}
              <span className={`${statusColor}`}>{order?.status}</span>
            </h6>
          </div>
          <div className="text-center">
            <button className="text-light btn btn-bg w-50 mt-2" onClick={(e) => handleOrderDetails(e, order._id)}>Details</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
