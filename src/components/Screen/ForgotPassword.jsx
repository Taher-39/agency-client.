import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://agency-server-git-main-taher-39.vercel.app/auth/request-password-reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error("Error requesting password reset: " + error.message);
            });
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-3">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-bg text-light">
                    Request Reset
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

export default ForgotPassword;
