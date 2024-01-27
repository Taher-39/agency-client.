import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../assets/logos/logo.png";
import { UserContext } from "../../../App";
import { toast } from "react-toastify";

const AddService = () => {
  const { loggedInUser } = useContext(UserContext);
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    description: "",
    subcategories: [{ subcategoryName: "Default Subcategory", price: 0, duration: 1 }],
  });
  const history = useHistory();

  const handleInputChange = (field, value) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...serviceData.subcategories];
    updatedSubcategories[index] = { ...updatedSubcategories[index], [field]: value };
    setServiceData({ ...serviceData, subcategories: updatedSubcategories });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { serviceName, description, subcategories } = serviceData;
    console.log(serviceData)

    try {
      const response = await fetch("https://agency-server-git-main-taher-39.vercel.app/services/add-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serviceName,
          description,
          prices: subcategories?.map(({ subcategoryName, price, duration }) => ({
            subcategory: (subcategoryName ? subcategoryName.trim() : "Default Subcategory"),
            price: price || 0,
            duration: duration || 1,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Service addition failed");
      }

      const data = await response.json();
      toast.success(data.message);
      setServiceData({
        serviceName: "",
        description: "",
        subcategories: [{ subcategoryName: "", price: 0, duration: 1 }],
      });
      history.push("/");
    } catch (error) {
      toast.error("Failed to add service");
    }
  };


  const renderSubcategoryInputs = () => {
    return serviceData.subcategories?.map((subcategory, index) => (
      <div key={index} className="mb-3">
        <label>Subcategory Name</label>
        <input
          type="text"
          className="form-control w-50"
          placeholder="e.g., Single Page"
          value={subcategory.subcategoryName}
          onChange={(e) => handleSubcategoryChange(index, "subcategoryName", e.target.value)}
        />
        <label>Price</label>
        <input
          type="number"
          className="form-control w-50"
          placeholder="e.g., 2000"
          value={subcategory.price}
          onChange={(e) => handleSubcategoryChange(index, "price", e.target.value)}
        />
        <label>Duration (Day)</label>
        <input
          className="form-control w-50 mb-3"
          type='number'
          value={serviceData.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          required
        />
      </div>
    ));
  };

  const addSubcategory = () => {
    setServiceData({
      ...serviceData,
      subcategories: [...serviceData.subcategories, { subcategoryName: "", price: 0, duration: 1 }],
    });
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
            <h2>Add Service</h2>
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
      <div className="row" style={{ height: "100vh" }}>
        <div className="left-side col-md-2 btn-bg">
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light p-5">
          <form onSubmit={handleFormSubmit}>
            <div className="input-area">
              <label>
                Service Title
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="App-Develop"
                  required
                  value={serviceData.serviceName}
                  onChange={(e) => handleInputChange("serviceName", e.target.value)}
                />
              </label>
              <br />

              {renderSubcategoryInputs()}

              <button type="button" className="btn btn-bg text-light mb-3" onClick={addSubcategory}>
                Add Subcategory
              </button>
              <br />

              <label>Description</label>
              <textarea
                className="form-control w-50 mb-3"
                rows="4"
                cols="50"
                value={serviceData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
              />

            </div>
            <button className="btn btn-bg text-light" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
