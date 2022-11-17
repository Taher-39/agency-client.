import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import EditServiceModal from "./EditServiceModal";

const ManageServices = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/getService")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, [services]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure for delete..?")) {
      fetch(`http://localhost:4000/api/v1/manage/${id}`, {
        method: "DELETE",
      }).then((result) => {
        if (result) {
          alert(`Service deleted when id: ${id}`);
        }
      });
    }
  };

  const updateHandler = (id) => {
    alert(id);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg" style={{ height: "100vh" }}>
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
                  <th>Mange</th>
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

                      <button
                        className="cursor-pointer btn text-success"
                        onClick={openModal}
                      >
                        <MdOutlineDesignServices />
                      </button>
                      <EditServiceModal
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        item={item}
                      />
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