import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import navLogo from "../../../images/logos/logo.png";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

const countryOptions = [
  { value: "BD", label: "Bangladesh" },
  { value: "US", label: "United States" },
  { value: "PK", label: "Pakistan" },
  { value: "IND", label: "India" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "IR", label: "Iran" },
  { value: "EG", label: "Egypt" },
  { value: "ID", label: "Indonesia" },
  { value: "PK", label: "Pakistan" },
  { value: "TR", label: "Turkey" },
  { value: "DZ", label: "Algeria" },
  { value: "MA", label: "Morocco" },
  { value: "IQ", label: "Iraq" },
  { value: "SD", label: "Sudan" },
  { value: "YE", label: "Yemen" },
  { value: "SY", label: "Syria" },
  { value: "TN", label: "Tunisia" },
  { value: "AF", label: "Afghanistan" },
  { value: "JO", label: "Jordan" },
  { value: "OM", label: "Oman" },
  { value: "KW", label: "Kuwait" },
  { value: "QA", label: "Qatar" },
  { value: "LB", label: "Lebanon" },
  { value: "UK", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "CH", label: "Switzerland" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "FI", label: "Finland" },
  { value: "NL", label: "Netherlands" },
  { value: "DK", label: "Denmark" },
  { value: "SG", label: "Singapore" },
  { value: "KR", label: "South Korea" },
  { value: "IE", label: "Ireland" },
  { value: "NZ", label: "New Zealand" },
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Belgium" },
  { value: "ES", label: "Spain" },
  { value: "LU", label: "Luxembourg" },
  { value: "HK", label: "Hong Kong" },
];

const AddAmount = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [amount, setAmount] = useState(""); // Initialize amount state as an empty string

  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      amount: Number(amount),
      name: loggedInUser.name,
      email: loggedInUser.email,
      country: selectedCountry.label,
      currency: selectedCurrency,
    };
    fetch("https://agency-server-git-main-taher-39.vercel.app/payment/addMoney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.replace(data.url);

          setLoggedInUser({ ...loggedInUser, amount: data.user.amount });
          sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
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
            <h2>Add Money</h2>
          </div>
          <div>
            <h5 className="user">{loggedInUser.name}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="left-side col-md-2 btn-bg sidebar-dash">
          <Sidebar />
        </div>
        <div className="right-side col-md-6 bg-light rounded px-5 pt-3">
          <h1 className="mb-3">Add money in your wallet</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-control w-75 mb-3"
                type="text"
                name="name"
                placeholder="Your Name"
                defaultValue={loggedInUser.name}
                disabled
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control w-75 mb-3"
                type="email"
                name="email"
                placeholder="Your Email"
                defaultValue={loggedInUser.email}
                disabled
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <Select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countryOptions}
                placeholder="Select country"
                className="form-select w-75"
                isSearchable
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                className="form-control w-75 mb-3"
                type="number"
                id="amount"
                name="amount"
                placeholder="Your Amount"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="currency" className="form-label">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="form-select w-75"
                required
              >
                <option value="">Select currency</option>
                <option value="BDT">BDT</option>
                {/* <option value="REAL">REAL</option>
                <option value="USD">USD</option>
                <option value="RUPE">RUPE</option> */}
              </select>
            </div>

            <button className="btn btn-bg text-light" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-4 pt-5 bg-light">
          <h5 className="user">
            Available Wallet Balance: <span>{loggedInUser.amount} TK</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AddAmount;
