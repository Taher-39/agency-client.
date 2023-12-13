import { useEffect, useState } from "react";

const Feedback = () => {
  const [userFeedback, setUserFeedback] = useState([]);

  useEffect(() => {
    fetch("https://agency-server-git-main-taher-39.vercel.app/feedback/getFeedback")
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {userFeedback.map((review, index) => (
            <div key={index} className="col">
              <div className="card shadow rounded">
                <div className="card-body">
                  <h3 className="card-title text-center">{review.name}</h3>
                  <h5 className="card-subtitle text-center my-2">
                    {review.company}
                  </h5>
                  <p className="card-text text-center">{review.comment}</p>
                  <div className="text-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        <i
                          style={{ color }}
                          className={
                            review.rating >= i + 1
                              ? "fas fa-star orange-rating"
                              : "far fa-star"
                          }
                        ></i>
                      </span>
                    ))}
                  </div>
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
