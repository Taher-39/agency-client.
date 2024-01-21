import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("uploadDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchServices = async () => {
    try {
      const response = await fetch(`https://agency-server-git-main-taher-39.vercel.app/services/get-limited-services?page=${currentPage}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      setServices(data.services);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  const handleSortChange = (e) => {
    const [sort, order] = e.target.value.split("-");
    setSortBy(sort);
    setSortOrder(order);
  };

  return (
    <div id='services'>
      <div className="container">
        <h1 className="text-center mt-5">
          <span className="text-service">Provide awesome</span>{" "}
          <span className="text-sp">services</span>
        </h1>

        <div className="row justify-content-center">
          <div className="col-md-6 my-3 text-center">
            <input
              type="text"
              className="form-control d-inline w-75"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-6 my-3 d-flex align-items-center">
            <label htmlFor="sortSelect" className="form-label me-2">Sort By:</label>
            <select
              id="sortSelect"
              className="form-select w-50"
              value={`${sortBy}-${sortOrder}`}
              onChange={handleSortChange}
            >
              <option value="uploadDate-desc">Latest Upload</option>
              <option value="uploadDate-asc">Oldest Upload</option>
              <option value="orderCount-desc">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="row">
          {services.length ? (
            services.map((serviceData) => (
              <ServiceCard key={serviceData._id} serviceData={serviceData} />
            ))
          ) : (
            <h4 className="text-center pt-5 text-secondary">Loading...</h4>
          )}
          <div className="text-center">
            <Link
              className="btn btn-bg text-light py-2 w-25"
              style={{ textDecoration: "none", padding: "0px 30px" }}
              to={`/uploadOrder/6572da2ce2a9a2de69554dab`}
            >
              Hire Us
            </Link>
          </div>

          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
