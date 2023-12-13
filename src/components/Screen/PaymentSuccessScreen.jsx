import { Link } from "react-router-dom";

const PaymentSuccessScreen = () => {
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
