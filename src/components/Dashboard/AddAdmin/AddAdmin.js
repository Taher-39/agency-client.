import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import { toast } from "react-toastify";

const AddAdmin = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://agency-server-git-main-taher-39.vercel.app/users/all-users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error("Error fetching users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleAdminStatusUpdate = async (userId, isAdminStatus) => {
    try {
      const response = await fetch(
        `https://agency-server-git-main-taher-39.vercel.app/users/update-user-role/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAdmin: isAdminStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating isAdmin status");
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: isAdminStatus } : user
        )
      );

      toast.success("isAdmin status updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error updating isAdmin status:", error);
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
            <h2>Add New Admin</h2>
          </div>
          <div>
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg sidebar-dash">
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light rounded p-5">
          <div>
            <h2>User List</h2>

            <div className="bg-light rounded container p-4 shadow">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Role</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="m-3 p-3">
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td
                        className={
                          user.isAdmin ? "text-success" : "text-danger"
                        }
                      >
                        {" "}
                        {user.isAdmin ? "Admin" : "Not Admin"}
                      </td>
                      <td>
                        <button
                          className="btn btn-bg text-light"
                          onClick={() =>
                            handleAdminStatusUpdate(user._id, !user.isAdmin)
                          }
                        >
                          Toggle Admin
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
    </div>
  );
};

export default AddAdmin;
