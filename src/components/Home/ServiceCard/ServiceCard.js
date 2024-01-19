import { Link } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ serviceData }) => {
  const { description, _id, name, prices } = serviceData;

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
        {/* <img
          className="card-img-top img-fluid"
          src={`data:image/png;base64, ${image?.img}`}
          alt="Service Img"
        /> */}
        <div className="card-body">
          <h4 className="card-title text-center">{name}</h4>
          <p className="card-text text-center">{description}</p>
          <p className="card-text text-center bg-light text-dark py-2 rounded">
            <span className="start-text">
              Start At {startPrice} TK
            </span>
          </p>
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
