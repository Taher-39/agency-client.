import { useEffect, useState } from "react";

const Feedback = () => {
  const [userFeedback, setUserFeedback] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/feedback/getFeedback")
      .then((res) => res.json())
      .then((data) => setUserFeedback(data.feedbackData));
  }, []);

  const color = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  return (
    <div className="my-5">
      <div className="container">
        <h1 className="text-center my-5">
          <span className="text-service">Clients</span>{" "}
          <span className="text-sp">Feedback</span>
        </h1>
        <div className="row">
          {userFeedback.map((review, index) => (
            <div
              key={index} // Using index as key as feedback doesn't have an _id
              className="col-md-4 d-flex align-items-stretch my-4"
            >
              <div
                className="shadow p-4 btn-bg text-light rounded"
                style={{ minWidth: "300px" }}
              >
                <h3 className="text-center">{review.name}</h3>
                <h5 className="text-center">{review.company}</h5>
                <p className="text-center">{review.comment}</p>
                <div className="text-center">
                  <span>
                    <i
                      style={{ color }}
                      className={
                        review.rating >= 1
                          ? "fas fa-star orange-rating"
                          : "far fa-star"
                      }
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color }}
                      className={
                        review.rating >= 2
                          ? "fas fa-star orange-rating"
                          : "far fa-star"
                      }
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color }}
                      className={
                        review.rating >= 3
                          ? "fas fa-star orange-rating"
                          : "far fa-star"
                      }
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color }}
                      className={
                        review.rating >= 4
                          ? "fas fa-star orange-rating"
                          : "far fa-star"
                      }
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color }}
                      className={
                        review.rating >= 5
                          ? "fas fa-star orange-rating"
                          : "far fa-star"
                      }
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
