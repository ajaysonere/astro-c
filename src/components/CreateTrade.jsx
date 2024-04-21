import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import Unauthorized from "./Unauthorized";

/*
    This component will help us to create signal trade , we can create the buy or sell signal in web app  after creating the signal , this will automatically redirect us to the signal page
*/

const CreateTrade = () => {
  const [companyName, setCompanyName] = useState("company 1");
  const [category, setCategory] = useState("Indian__Stocks"); // State for storing category
  const [stopLoss, setStopLoss] = useState(""); // State for storing stop loss
  const [target, setTarget] = useState(""); // State for storing target
  const [basePrice, setBasePrice] = useState(""); // State for storing base price
  const [error, setError] = useState(false); // State for storing error message
  const [data, setData] = useState([]); // State for storing data related to companies
  const [indianCompanyName, setIndianCompanyName] = useState([]);

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle company name change
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Function to handle stop loss change
  const handleStopLossChange = (event) => {
    setStopLoss(event.target.value);
  };

  // Function to handle target change
  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  };

  // Function to handle base price change
  const handleBasePriceChange = (event) => {
    setBasePrice(event.target.value);
  };

  // Fetching data related to company names when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/get-us-company-name`
        );

        setData(response?.data);

        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/get-indian-company-name`
        );

        setIndianCompanyName(res?.data);
      } catch (error) {
        console.log(error); // Logging error if data fetching fails
      }
    };
    getData();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event, action) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/trades/create-trade`,
        { type: action, companyName, category, basePrice, target, stopLoss }
      );

      if (response.status == 201) {
        navigate("/signals");
      }
    } catch (error) {
      console.log("error");
      setError(error.response.data.message);
    }
  };

  const { currentUser } = useContext(userContext); // Getting current user context

  const role = currentUser?.role; // Extracting role from current user context

  return (
    <section
      className="container trade__form__container"
      style={{ marginTop: "10rem" }}
    >
      {role == "admin" ? ( // Rendering trade form if the user is an admin
        <>
          <div className="form__container  ">
            <div className="register__contant">
              {error && ( // Displaying error message if exists
                <p
                  className="failed"
                  style={{ textAlign: "center", marginBottom: "0.8rem" }}
                >
                  {error}
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="trade__form">
              {/* UI components for trade form */}
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                onChange={handleCategoryChange}
              >
                <option value="Indian__Stocks">Indian-Stocks</option>
                <option value="Indian__Commodities">Indian-Commodities</option>
                <option value="Indian__Metals">Indian Metals </option>
                <option value="US__Stocks">US-Stocks</option>
                <option value="US__Commodities">US-Commodities</option>
                <option value="US__Metals">US-Metals</option>
              </select>

              {category !== "Indian__Commodities" &&
                category !== "US__Commodities" &&
                category !== "Indian__Stocks" &&
                category !== "Indian__Metals" && (
                  <>
                    <label htmlFor="company_name">Company Name:</label>
                    <select
                      name="company_name"
                      id="company_name"
                      value={companyName}
                      onChange={handleCompanyNameChange}
                    >
                      {data.map(({ Symbol }, index) => {
                        return (
                          <option key={index} value={`${Symbol}`}>
                            {Symbol}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}

              {category !== "Indian__Commodities" &&
                category !== "US__Commodities" &&
                category !== "US__Stocks" &&
                category !== "US__Metals" && (
                  <>
                    <label htmlFor="company_name">Company Name:</label>
                    <select
                      name="company_name"
                      id="company_name"
                      value={companyName}
                      onChange={handleCompanyNameChange}
                    >
                      {indianCompanyName.map(({ Symbol }, index) => {
                        return (
                          <option key={index} value={`${Symbol}`}>
                            {Symbol}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}

              {(category === "Indian__Commodities" ||
                category === "US__Commodities") && (
                <>
                  <label htmlFor="company_name">Commodities</label>
                  <select
                    name="company_name"
                    id="company_name"
                    value={companyName}
                    onChange={handleCompanyNameChange}
                  >
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="curde-oil">Crude Oil</option>
                    <option value="natural-gas">Natural Gas</option>
                    <option value="aluminimum">Aluminimum</option>
                    <option value="copper">Copper</option>
                    <option value="lead">Lead</option>
                    <option value="zinc">Zinc</option>
                    <option value="nickel">Nickel</option>
                  </select>
                </>
              )}

              <label htmlFor="base_price">Base Price:</label>
              <input
                type="number"
                name="base_price"
                id="base_price"
                value={basePrice}
                onChange={handleBasePriceChange}
              />

              <label htmlFor="stop_loss">Stop Loss:</label>
              <input
                type="number"
                name="stop_loss"
                id="stop_loss"
                value={stopLoss}
                onChange={handleStopLossChange}
              />

              <label htmlFor="target">Target:</label>
              <input
                type="number"
                name="target"
                id="target"
                value={target}
                onChange={handleTargetChange}
              />

              <button
                name="buy"
                type="submit"
                className="btns buy"
                onClick={(e) => handleSubmit(e, "buy")}
              >
                Buy
              </button>
              <button
                name="sell"
                type="submit"
                className="btns sell"
                onClick={(e) => handleSubmit(e, "sell")}
              >
                Sell
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="container unauthorized__trade">
          <Unauthorized />{" "}
        </div>
      )}
    </section>
  );
};

export default CreateTrade;
