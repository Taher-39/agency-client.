import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/services/getAllServices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <h1 className="text-center my-5">
          <span className="text-service">Provide awesome</span>{" "}
          <span className="text-sp">services</span>
        </h1>
        <div className="row">
          {services.length ? (
            services.map((serviceData) => (
              <ServiceCard
                key={serviceData._id}
                serviceData={serviceData}
              ></ServiceCard>
            ))
          ) : (
            <h4 className="text-center pt-5 text-secondary">Loading...</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
