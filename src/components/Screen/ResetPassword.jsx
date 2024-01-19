import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const history = useHistory();
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://agency-server-git-main-taher-39.vercel.app/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ resetToken: token, newPassword }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    toast.success(data.message);
                    history.push("/login"); 
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error("Error resetting password: " + error.message);
            });
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-3">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Reset Password
                </button>
                <Link
                    to="/"
                    className="btn btn-outline-success btn-block mx-3"
                >
                    Home
                </Link>
            </form>
        </div>
    );
};

export default ResetPassword;
