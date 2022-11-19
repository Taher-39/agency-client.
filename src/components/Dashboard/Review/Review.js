import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Review = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [review, setReview] = useState({});
  const [isClient, setIsClient] = useState(false);

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

  useEffect(() => {
    fetch("https://protected-plateau-36631.herokuapp.com/api/v1/isClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsClient(data);
        }
      });
  }, []);

  const handleBlur = (e) => {
    const newReview = {
      ...review,
      name: loggedInUser.name,
      email: loggedInUser.email,
    };
    newReview[e.target.name] = e.target.value;
    setReview(newReview);
  };

  const handleSubmit = (e) => {
    if (isClient) {
      const reviewWithRating = {
        ...review,
        rating: currentValue,
      };
      fetch("https://protected-plateau-36631.herokuapp.com/api/v1/postReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewWithRating),
      }).then((res) => {
        if (res) {
          alert("Review added successfully");
        }
      });
    } else {
      alert("Your Are Not A Client, Please Order a service");
    }
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
            <h2>Review</h2>
          </div>
          <div>
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg">
          <Sidebar></Sidebar>
        </div>
        <div className="right-side col-md-10 bg-light p-5">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control w-50 mb-3"
              type="text"
              name="name"
              placeholder="Your Name"
              defaultValue={loggedInUser.name}
            />

            <input
              className="form-control w-50 mb-3"
              onBlur={handleBlur}
              type="text"
              name="designation"
              placeholder="Company's name / Designation"
              required
            />

            <textarea
              className="form-control w-50 mb-3"
              onBlur={handleBlur}
              cols="30"
              rows="10"
              name="description"
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
