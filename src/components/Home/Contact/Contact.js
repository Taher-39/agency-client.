import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://agency-server-git-main-taher-39.vercel.app/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div id="contact" className="header-bg contact">
      <div className="container contact-body">
        <div className="row py-5">
          <div className="col-sm-6">
            <h1 className="text-contact">
              Let us handle your <br /> <span>project, professionally.</span>
            </h1>
            <p className="py-3">
              With well-written codes, we build amazing apps for <br /> all
              platforms, mobile and web apps in general.
            </p>
          </div>
          <div className="col-sm-6">
            <form onSubmit={handleSubmit}>
              <input
                className="form-control w-75 mb-3"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="form-control w-75 mb-3"
                type="text"
                name="subject"
                placeholder="Email Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                className="form-control w-75 mb-3"
                cols="30"
                rows="6"
                name="description"
                placeholder="Your Message"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
              <button className="btn btn-bg text-light" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
