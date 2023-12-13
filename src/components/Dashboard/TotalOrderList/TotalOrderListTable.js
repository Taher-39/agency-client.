import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TotalOrderListTable = ({ totalOrders }) => {
  const [orders, setOrders] = useState(totalOrders);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;

    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);

    fetch(`http://localhost:8080/order/updateStatus/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Status Changed Successfully.");
        }
      })
      .catch((error) => {
        toast.error("Failed to change status.");
        setOrders(totalOrders);
      });
  };

  const TD = ({ status }) => {
    let statusColor = "";

    switch (status) {
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
    return <td className={`${statusColor}`}>{status}</td>;
  };
  return (
    <div>
      <div className="bg-light rounded container p-4 shadow">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Category</th>
              <th>Description</th>
              <th>Present Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="m-3 p-3">
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.service}</td>
                <td>{order.description}</td>
                <TD status={order.status} />
                <td>
                  <select
                    onChange={(e) => handleStatusChange(e, order._id)}
                    name="status"
                    id="status"
                    value={order.status}
                  >
                    <option value="">Change Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalOrderListTable;
