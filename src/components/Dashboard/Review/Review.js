import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../assets/logos/logo.png";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Review = () => {
  const [loggedInUser] = useContext(UserContext);
  const [feedback, setFeedback] = useState({});
  const id = loggedInUser._id;
  const history = useHistory();

  //For rating
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleBlur = (e) => {
    const newFeedback = {
      ...feedback,
      name: loggedInUser.name,
      email: loggedInUser.email,
    };
    newFeedback[e.target.name] = e.target.value;
    setFeedback(newFeedback);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const finalFeedback = {
      ...feedback,
      rating: currentValue,
      email: loggedInUser.email,
    };

    fetch(`https://agency-server-git-main-taher-39.vercel.app/feedback/post-feedback/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalFeedback),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed! Order first then post feedback.");
      })
      .then((data) => {
        toast.success("Review added successfully");
        history.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
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
            <h2>Review</h2>
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
        <div className="left-side col-md-2 btn-bg ">
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light p-5">
          <form onSubmit={handleFeedbackSubmit}>
            <input
              className="form-control w-50 mb-3"
              type="text"
              name="name"
              placeholder="Your Name"
              defaultValue={loggedInUser.name}
              disabled
            />

            <input
              className="form-control w-50 mb-3"
              onBlur={handleBlur}
              type="text"
              name="company"
              placeholder="Company's name / Designation"
              required
            />

            <textarea
              className="form-control w-50 mb-3"
              onBlur={handleBlur}
              cols="30"
              rows="10"
              name="comment"
              required
            ></textarea>

            <div style={styles.stars} className="my-4">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
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

const styles = {
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default Review;
