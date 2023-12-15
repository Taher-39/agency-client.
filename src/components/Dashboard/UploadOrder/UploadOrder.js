import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { toast } from "react-toastify";

const UploadOrder = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [orderFile, setOrderFile] = useState();
  const [service, setService] = useState("");
  const [option, setOption] = useState("");
  const [price, setPrice] = useState(0);
  const history = useHistory();

  const handleServiceChange = (event) => {
    setService(event.target.value);
    setOption("");
    setPrice(0);
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
    let selectedPrice = 0;
    if (service === "webDev") {
      switch (event.target.value) {
        case "singlePage":
          selectedPrice = 2000;
          break;
        case "threePages":
          selectedPrice = 3000;
          break;
        case "fivePages":
          selectedPrice = 5000;
          break;
        case "tenPages":
          selectedPrice = 10000;
          break;
        default:
          selectedPrice = 0;
      }
    } else if (service === "graphicsDesign") {
      switch (event.target.value) {
        case "singleDesign":
          selectedPrice = 1500;
          break;
        case "doubleDesign":
          selectedPrice = 2500;
          break;
        case "fiveDesign":
          selectedPrice = 7000;
          break;
        default:
          selectedPrice = 0;
      }
    } else if (service === "figmaToReact") {
      switch (event.target.value) {
        case "singlePage":
          selectedPrice = 1300;
          break;
        case "threePages":
          selectedPrice = 2500;
          break;
        case "fivePages":
          selectedPrice = 4500;
          break;
        case "tenPages":
          selectedPrice = 8000;
          break;
        default:
          selectedPrice = 0;
      }
    } else if (service === "videoEditing") {
      switch (event.target.value) {
        case "shortVideo(<15min)":
          selectedPrice = 5000;
          break;
        case "mediumVideo(<60min)":
          selectedPrice = 15000;
          break;
        case "longVideo(<120min)":
          selectedPrice = 25000;
          break;
        default:
          selectedPrice = 0;
      }
    }
    setPrice(selectedPrice);
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
    const newOrderForm = new FormData();
    newOrderForm.append("name", loggedInUser.name);
    newOrderForm.append("email", loggedInUser.email);
    newOrderForm.append("description", description);
    newOrderForm.append("status", "pending");
    newOrderForm.append("file", orderFile);
    newOrderForm.append("service", service);
    newOrderForm.append("option", option);
    newOrderForm.append("price", price);

    console.log(newOrderForm);

    if (loggedInUser.amount >= price) {
      try {
        const orderResponse = await fetch(
          "https://agency-server-git-main-taher-39.vercel.app/order/upload-order",
          {
            method: "POST",
            body: newOrderForm,
          }
        );

        const orderData = await orderResponse.json();

        if (orderData) {
          toast.success("Order Submitted, Check Service List");
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

          if (updateAmountResponse.ok) {
            const updateAmountData = await updateAmountResponse.json();
            setLoggedInUser((prevUser) => ({
              ...prevUser,
              amount: updateAmountData.user.amount,
            }));
            history.push("/userOrders");
          } else {
            const errorData = await updateAmountResponse.json();
            throw new Error(errorData.message);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error(
        "Your Wallet Price Is Insufficient. Pay From AddMoney Option"
      );
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
              to="/signUp"
            >
              {loggedInUser.name ? (
                <div>
                  <span>{loggedInUser.name}</span>
                </div>
              ) : (
                "SignUp"
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
            >
              <option value="">Select a Service</option>
              <option value="webDev">Web Development</option>
              <option value="graphicsDesign">Graphics Design</option>
              <option value="figmaToReact">Figma to React</option>
              <option value="videoEditing">Video Editing</option>
            </select>

            {service && (
              <div className="my-4">
                <h3>Select an Option:</h3>
                <select
                  className="form-select w-75"
                  onChange={handleOptionChange}
                >
                  <option value="">Select an Option</option>
                  {service === "webDev" && (
                    <>
                      <option value="singlePage">Single Page - 2000 tk</option>
                      <option value="threePages">Three Pages - 3000 tk</option>
                      <option value="fivePages">Five Pages - 5000 tk</option>
                      <option value="tenPages">Ten Pages - 10000 tk</option>
                    </>
                  )}
                  {service === "graphicsDesign" && (
                    <>
                      <option value="singleDesign">
                        Single Design - Price 1500 tk
                      </option>
                      <option value="doubleDesign">
                        Double Design - Price 2500 tk
                      </option>
                      <option value="fiveDesign">
                        Five Design - Price 7000 tk
                      </option>
                    </>
                  )}
                  {service === "figmaToReact" && (
                    <>
                      <option value="singlePage">Single Page - 1300 tk</option>
                      <option value="threePages">Three Pages - 2500 tk</option>
                      <option value="fivePages">Five Pages - 4500 tk</option>
                      <option value="tenPages">Ten Pages - 8000 tk</option>
                    </>
                  )}
                  {service === "videoEditing" && (
                    <>
                      <option value="shortVideo(<15min)">
                        Short Video - Price 5000 tk
                      </option>
                      <option value="mediumVideo(<60min)">
                        Medium Video - Price 15000 tk
                      </option>
                      <option value="longVideo(<120min)">
                        Long Video - Price 25000 tk
                      </option>
                    </>
                  )}
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
