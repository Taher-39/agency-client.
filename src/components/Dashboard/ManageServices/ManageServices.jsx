import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../assets/logos/logo.png";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

const ManageServices = () => {
  const { loggedInUser } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://agency-server-git-main-taher-39.vercel.app/services/get-limited-services?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure for delete..?")) {
      fetch(`https://agency-server-git-main-taher-39.vercel.app/services/deleteService/${id}`, {
        method: "DELETE",
      })
        .then((result) => result.json())
        .then((data) => {
          if (data) {
            toast.success(data.message);
            setServices((prevServices) =>
              prevServices?.filter((service) => service._id !== id)
            );
          } else {
            toast.error(data.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting service:", error);
        });
    }
  };

  const handleServiceEdit = (id) => {
    toast.success(`This Feature Comming Soon ${id}`)
  }

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
        <div className="right-side col-md-10 bg-light p-5">
          <div className="bg-light rounded container p-4 shadow">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {services?.map((item) => (
                  <tr key={item._id} className="m-3 p-3">
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="text-danger cursor-pointer btn"
                        onClick={() => handleServiceEdit(item._id)}
                      >
                        <MdEdit />
                      </button>
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
            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
