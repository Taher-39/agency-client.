import { Link } from "react-router-dom";

const PaymentFailScreen = () => {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h2>Payment Failed</h2>
        <p>Oops! Your payment was unsuccessful.</p>
        <p>Please try again or contact support for assistance.</p>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default PaymentFailScreen;
