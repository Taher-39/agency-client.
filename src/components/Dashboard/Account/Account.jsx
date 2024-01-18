import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { UserContext } from "../../../App";
import navLogo from "../../../assets/logos/logo.png";
import { toast } from "react-toastify";

const Account = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [formData, setFormData] = useState({
        newName: "",
        currentPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNameUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://agency-server-git-main-taher-39.vercel.app/auth/change-name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: loggedInUser._id,
                    newName: formData.newName,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setLoggedInUser((prevUser) => ({
                    ...prevUser,
                    name: formData.newName,
                }));
                toast.success(data.message);
                setFormData({
                    ...formData,
                    newName: "",
                });
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating name:", error.message);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://agency-server-git-main-taher-39.vercel.app/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: loggedInUser._id,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setFormData({
                    ...formData,
                    currentPassword: "",
                    newPassword: "",
                });
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating password:", error.message);
        }
    };
    return (
        <div>
            <div>
                <div style={{ backgroundColor: "#FBD062" }} className="dashboard-top">
                    <div className="d-sm-flex justify-content-around py-4">
                        <div>
                            <Link to="/">
                                <img src={navLogo} style={{ width: "150px" }} alt="" />
                            </Link>
                        </div>
                        <div className="page-name">
                            <h2>Dashboard</h2>
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
            </div>
            <div className="row" style={{ height: "100vh" }}>
                <div className="left-side col-md-2 btn-bg">
                    <div>
                        <Sidebar></Sidebar>
                    </div>
                </div>
                <div className="right-side col-md-10 bg-light p-5">
                    <h3>WellCome {loggedInUser.name}</h3>
                    <div className="my-4">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="form-control w-50"
                            value={loggedInUser.email}
                            disabled
                        />
                    </div>
                    <form onSubmit={handleNameUpdate}>
                        <div className="form-group">
                            <label htmlFor="newName">New Name:</label>
                            <input
                                type="text"
                                className="form-control w-50"
                                id="newName"
                                name="newName"
                                value={formData.newName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn login text-light mt-3">
                            Update Name
                        </button>
                    </form>

                    <form onSubmit={handlePasswordUpdate} className="mt-4">
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password:</label>
                            <input
                                type="password"
                                className="form-control w-50"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                className="form-control w-50 "
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn login text-light mt-3">
                            Update Password
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Account