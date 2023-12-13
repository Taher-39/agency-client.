import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useEffect } from "react";

const PaymentSuccessScreen = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const transactionId = query.get("transactionId");

  useEffect(() => {
    if (transactionId) {
      setLoggedInUser({});
      sessionStorage.removeItem("loggedInUser");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]); 

  return (
    <div className="container mt-4">
      <div className="alert alert-success" role="alert">
        <h2>Payment Successful</h2>
        <p>Congratulations! Your payment was successful.</p>
        <p>Thank you for your purchase.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessScreen;
