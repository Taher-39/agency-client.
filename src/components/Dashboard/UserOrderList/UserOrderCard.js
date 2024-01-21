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
  console.log("Image URL:", `https://agency-server-git-main-taher-39.vercel.app/${order.file}`);

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

          <h6>
            Payment status: <span className="text-success">Paid</span>
          </h6>
          <h6 className="ml-4">
            Service Status:{" "}
            <span className={`${statusColor}`}>{order?.status}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
