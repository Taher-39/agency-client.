// EmailVerificationScreen.js

import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerificationScreen = () => {
    const { token } = useParams();
    const history = useHistory();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`https://agency-server-git-main-taher-39.vercel.app/auth/verify-email/${token}`);
                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message);
                    history.push("/login");
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Error during email verification:", error.message);
            }
        };

        verifyEmail();
    }, [token, history]);

    return (
        <div>
            <p>Verifying email...</p>
        </div>
    );
};

export default EmailVerificationScreen;

