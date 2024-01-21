import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../assets/logos/logo.png";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const UploadOrder = () => {
  const { id } = useParams();
  console.log(id)
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [orderFile, setOrderFile] = useState();
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [price, setPrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://agency-server-git-main-taher-39.vercel.app/services/get-all-services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        const services = data.services || [];
        setServiceOptions(services);
        console.log(services)

        const selectedService = services.find((service) => service._id === id);
        if (selectedService) {
          setSelectedService(selectedService._id);
        }

      } catch (error) {
        toast.error("Error fetching services:", error.message);
      }
    };

    fetchServices();
  }, [id]);

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setSelectedService(selectedService);
    setSelectedOption("");
    setPrice(0);
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    const selectedServiceObj = serviceOptions.find((service) => service._id === selectedService);
    const selectedOptionObj = selectedServiceObj.prices.find((price) => price._id === selectedOption);
    setPrice(selectedOptionObj.price || 0);
  };

  const userId = loggedInUser._id;

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFile = (e) => {
    setOrderFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrderForm = createOrderForm();

    if (loggedInUser.amount >= price) {
      try {
        await uploadOrder(newOrderForm);
        await updateUserAmount(price);
        history.push("/userOrders");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Your Wallet Price Is Insufficient. Pay From AddMoney Option");
    }
  };

  const createOrderForm = () => {
    const newOrderForm = new FormData();
    newOrderForm.append("name", loggedInUser.name);
    newOrderForm.append("email", loggedInUser.email);
    newOrderForm.append("description", description);
    newOrderForm.append("status", "pending");
    newOrderForm.append("service", selectedService);
    newOrderForm.append("option", selectedOption);
    newOrderForm.append("price", price);
    newOrderForm.append("file", orderFile);
    return newOrderForm;
  };

  const uploadOrder = async (newOrderForm) => {
    const orderResponse = await fetch(
      "https://agency-server-git-main-taher-39.vercel.app/order/upload-order",
      {
        method: "POST",
        body: newOrderForm,
      }
    );

    if (!orderResponse.ok) {
      throw new Error("Error uploading order");
    }

    const orderData = await orderResponse.json();

    if (orderData.error) {
      throw new Error(orderData.error);
    } else {
      toast.success("Order Submitted, Check Service List");
    }
  };

  const updateUserAmount = async (price) => {
    const updateAmountResponse = await fetch(
      `https://agency-server-git-main-taher-39.vercel.app/auth/users/${userId}/update-amount`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }
    );

    if (!updateAmountResponse.ok) {
      const errorData = await updateAmountResponse.json();
      throw new Error(errorData.message);
    } else {
      const updateAmountData = await updateAmountResponse.json();
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        amount: updateAmountData.user.amount,
      }));
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
            <h2>Order</h2>
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
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="left-side col-md-2 btn-bg">
          <Sidebar />
        </div>
        <div className="right-side col-md-6 bg-light py-5 ps-5">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control w-75 mb-3"
              type="text"
              name="name"
              placeholder="Your name / company's name"
              defaultValue={loggedInUser.name}
              disabled
            />
            <input
              className="form-control w-75 mb-3"
              type="email"
              name="email"
              placeholder="Your email address"
              defaultValue={loggedInUser.email}
              disabled
            />
            <h2>Select a Service:</h2>
            <select
              className="form-select w-75 mb-3"
              onChange={handleServiceChange}
              value={selectedService}
              required
            >
              <option value="" disabled hidden>
                Select a Service
              </option>
              {serviceOptions.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>


            {selectedService && (
              <div className="my-4">
                <h3>Select an Option:</h3>
                <select
                  className="form-select w-75"
                  onChange={handleOptionChange}
                  required
                >
                  <option value="">Select an Option</option>
                  {serviceOptions
                    .find((service) => service._id === selectedService)
                    .prices.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.subcategory}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {price > 0 && (
              <div className="my-4">
                <h4>Selected Price: {price} tk</h4>
              </div>
            )}
            <textarea
              className="form-control w-75 mb-3"
              onChange={handleDescription}
              name="description"
              placeholder="Service Details"
              cols="30"
              rows="5"
              required
            ></textarea>
            <input
              className="form-control w-75 mb-3"
              onChange={handleFile}
              type="file"
              name="file"
              required
            />
            <button type="submit" className="btn btn-bg text-light">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-4 pt-5 bg-light">
          <h5>
            Available Wallet Balance:{" "}
            <span>
              {loggedInUser.amount === 0 ? 0 : loggedInUser.amount} TK
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default UploadOrder;
