import { useEffect, useState } from "react";
import "./Feedback.css"; // Import your custom CSS file for styling

const Feedback = () => {
  const [userFeedback, setUserFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  useEffect(() => {
    fetch("https://agency-server-git-main-taher-39.vercel.app/feedback/getFeedback")
      .then((res) => res.json())
      .then((data) => {
        const feedbackData = data.feedbackData?.map((feedback) => ({
          ...feedback,
          showFullText: false,
        }));
        setUserFeedback(feedbackData);
      });
  }, []);


  const color = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const handleReadMore = (globalIndex) => {
    setUserFeedback((prevFeedback) =>
      prevFeedback?.map((feedback, i) =>
        i === globalIndex
          ? { ...feedback, showFullText: !feedback.showFullText }
          : feedback
      )
    );
  };



  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = userFeedback.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="my-5">
      <div className="container">
        <h1 className="text-center my-5">
          <span className="text-service">Clients</span>{" "}
          <span className="text-sp">Feedback</span>
        </h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {currentReviews?.map((review, localIndex) => (
            <div key={localIndex} className="col">
              <div className="card shadow rounded">
                <div className="card-body">
                  <h3 className="card-title text-center">{review.name}</h3>
                  <h5 className="card-subtitle text-center my-2">
                    {review.company}
                  </h5>
                  <p className={`card-text text-center ${review.showFullText ? 'full-text' : 'truncated-text'}`}>
                    {review.showFullText ? review.comment : review.comment.slice(0, 80) + "..."}
                  </p>
                  <div className="text-center">
                    {[...Array(5)]?.map((_, i) => (
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
                  {review.comment.length > 80 && (
                    <div className="text-center mt-3">
                      <button
                        className="btn btn-bg text-light"
                        onClick={() => handleReadMore(indexOfFirstReview + localIndex)}
                      >
                        {review.showFullText ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="text-center mt-3">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(userFeedback.length / reviewsPerPage))]?.map(
              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
