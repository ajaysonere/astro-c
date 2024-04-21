// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Trade from "../components/Trade";
import { userContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";



/*
    This componet show all the signal or trade we have created. we can filter all the signals
    based on the filters. 
*/




const Signals = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);

  const role = currentUser?.role;
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // useEffect will fetch the data based on the categories
  useEffect(() => {
    const getData = async () => {
      try {
        let url = `${import.meta.env.VITE_REACT_APP_BASE_URL}/trades/get-trade`;

        if (selectedCategory) {
          url += `/${selectedCategory}`;
        }

        const response = await axios.get(url);

        setData(response?.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    getData();
  }, [selectedCategory]);

  const handleFilteredData = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <section className="container">
      <div className="posts__container">
        <div className="filter-posts">
          <select onChange={handleFilteredData}>
            <option value="">All</option>
            <option value="Indian__Stocks">Indian Stocks</option>
            <option value="Indian__Commodities">Indian Commodity</option>
            <option value="Indian__Metals">Indian Metals</option>
            <option value="US__Stocks">US Stocks</option>
            <option value="US__Commodities">US Commodity</option>
            <option value="US__Metals">US Metals</option>
          </select>
        </div>
        <div className="signal-content posts">
          {role === "signals" || role === "admin" ? (
            data.length > 0 ? (
              data.map(
                ({ type, companyName, basePrice, stopLoss, target }, index) => (
                  <Trade
                    key={index}
                    type={type}
                    companyName={companyName}
                    basePrice={basePrice}
                    stopLoss={stopLoss}
                    targetPrice={target}
                  />
                )
              )
            ) : (
              <div className="notfound">
                <h3>Data is not provided</h3>
              </div>
            )
          ) : (
            <Unauthorized />
          )}
        </div>
      </div>
    </section>
  );
};

export default Signals;
