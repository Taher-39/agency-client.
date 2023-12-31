import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import { toast } from "react-toastify";

const AddService = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [serviceName, setServiceName] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const history = useHistory();

  const handleServiceName = (e) => {
    setServiceName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFormSubmit = (e) => {
    const serviceFormData = new FormData();
    serviceFormData.append("title", serviceName);
    serviceFormData.append("file", file);
    serviceFormData.append("description", description);

    fetch("https://agency-server-git-main-taher-39.vercel.app/services/addService", {
      method: "POST",
      body: serviceFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Services Added Successfully.");
          setDescription("");
          setFile("");
          setServiceName("");
          history.push("/");
        }
      })
      .catch((err) => toast.error(err));

    e.preventDefault();
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
                  onBlur={handleServiceName}
                />
              </label>
              <br />

              <label>
                Icon
                <input
                  className="form-control mb-3"
                  type="file"
                  name="icon"
                  required
                  onChange={handleFileChange}
                />
              </label>
              <br />

              <label>Description</label>
              <textarea
                className="form-control w-50 mb-3"
                rows="4"
                cols="50"
                onBlur={handleDescription}
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
