import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

const ManageServices = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://agency-server-git-main-taher-39.vercel.app/services/getAllServices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, [services]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure for delete..?")) {
      fetch(`https://agency-server-git-main-taher-39.vercel.app/services/deleteService/${id}`, {
        method: "DELETE",
      }).then((result) => {
        if (result) {
          toast.success(result.message);
        } else {
          toast.error(result.statusText);
        }
      });
    }
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
            <h2>Manage Services</h2>
          </div>
          <div>
            <Link
              className="nav-link login btn user-name-link"
              style={{ color: "#fff", padding: "10px 30px" }}
              to="/signUp"
            >
              {loggedInUser.name ? (
                <div>
                  <span>{loggedInUser.name}</span>
                </div>
              ) : (
                "SignUp"
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "100vh" }}>
        <div className="left-side col-md-2 btn-bg">
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light p-5">
          <div className="bg-light rounded container p-4 shadow">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item) => (
                  <tr key={item._id} className="m-3 p-3">
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src={`data:image/png;base64, ${item.image?.img}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <button
                        className="text-danger cursor-pointer btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
