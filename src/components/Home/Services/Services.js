import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://agency-server-git-main-taher-39.vercel.app/services/getAllServices?page=${currentPage}&search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setTotalPages(data.totalPages);
      });
  }, [currentPage, searchTerm]);
  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-5">
          <span className="text-service">Provide awesome</span>{" "}
          <span className="text-sp">services</span>
        </h1>
        <div className="row">
          <div className="col-md-6 mx-auto mt-3 mb-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          {/* Service Cards */}
          {services.length ? (
            services.map((serviceData) => (
              <ServiceCard key={serviceData._id} serviceData={serviceData} />
            ))
          ) : (
            <h4 className="text-center pt-5 text-secondary">Loading...</h4>
          )}

          {/* Pagination */}
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
