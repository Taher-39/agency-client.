import React from "react";

const UserOrderCard = ({ order }) => {
  let statusColor = "";

  switch (order?.status) {
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

  return (
    <div className="col-md-4 d-flex align-items-stretch my-3">
      <div className="shadow p-4" style={{ minWidth: "300px" }}>
        <div className="d-flex justify-content-around">
          <div className="img">
            <img
              style={{ width: "50px", height: "50px" }}
              src={`data:image/png;base64, ${order?.image?.img}`}
              alt=""
            />
          </div>
        </div>
        <h4>{order.category}</h4>
        <p>{order.description}</p>

        <h6>
          Payment status: <span className="text-success">Paid</span>
        </h6>
        <h6 className="ml-4">
          Service Status:{" "}
          <span className={`${statusColor}`}>{order?.status}</span>
        </h6>
      </div>
    </div>
  );
};

export default UserOrderCard;
