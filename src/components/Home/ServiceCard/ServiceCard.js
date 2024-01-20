import { Link } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ serviceData }) => {
  const { description, _id, name, prices, orderCount } = serviceData;

  const getStartPrice = () => {
    if (prices && prices.length > 0) {
      const priceArray = prices.map((price) => price.price);
      const minPrice = Math.min(...priceArray);

      return minPrice;
    }
    return 0;
  };

  const startPrice = getStartPrice();

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h4 className="card-title text-center">{name}</h4>
          <p className="card-text text-center">{description}</p>
          <div className="card-text bg-light text-dark text-center py-2 rounded">
            <p className="start-text mb-0">
              Start At {startPrice} TK
            </p>
            <p className="mb-0">Orders: {orderCount}</p>
          </div>


          <div className="text-center">
            <Link
              className="btn btn-danger py-2"
              style={{ textDecoration: "none", padding: "0px 30px" }}
              to={`/uploadOrder/${_id}`}
            >
              Hire Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

