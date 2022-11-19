import React from "react";

const TotalOrderListTable = ({ totalOrders }) => {
  const handleStatusChange = (e, id) => {
    console.log(id, e.target.value);
    const statusData = { id, status: e.target.value };

    fetch(
      `https://protected-plateau-36631.herokuapp.com/api/v1/updateStatus/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Status Changed Successfully.");
        }
      });
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {totalOrders.map((order) => (
              <tr key={order._id} className="m-3 p-3">
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.category}</td>
                <td>{order.description}</td>
                <td>
                  <select
                    onChange={(e) => handleStatusChange(e, order._id)}
                    name="status"
                    id="status"
                  >
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
