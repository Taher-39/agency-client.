import React, { useEffect, useState } from "react";
// import { MdOutlineDesignServices } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const TokenCard = () => {
  const [allValidTokens, setAllValidTokens] = useState([]);

  useEffect(() => {
    fetch("https://protected-plateau-36631.herokuapp.com/api/v1/getValidToken")
      .then((res) => res.json())
      .then((data) => setAllValidTokens(data));
  }, [allValidTokens]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure for delete..?")) {
      fetch(
        `https://protected-plateau-36631.herokuapp.com/api/v1/manage-token/${id}`,
        {
          method: "DELETE",
        }
      ).then((result) => {
        if (result) {
          alert(`Token deleted successfully when id: ${id}`);
        }
      });
    }
  };

  return (
    <div>
      <div className="bg-light rounded container p-4 shadow">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>No</th>
              <th>Amount</th>
              <th>Token</th>
              <th>CreatedAt</th>
              <th>isValid</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allValidTokens.map((item, index) => (
              <tr key={item._id} className="m-3 p-3">
                <td>{index + 1}</td>
                <td>{item.amount}</td>
                <td>{item.token}</td>
                <td>{item.createdAt}</td>
                <td
                  className={`${item.isValid ? "text-success" : "text-danger"}`}
                >
                  {item.isValid ? "True" : "False"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-danger cursor-pointer btn"
                  >
                    <RiDeleteBin5Line />
                  </button>

                  {/* <button
                    onClick={() => TokenEditHandler(item._id)}
                    className="cursor-pointer btn text-success"
                  >
                    <MdOutlineDesignServices />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenCard;
