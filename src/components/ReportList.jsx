import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../contexts/UserContext";
import Unauthorized from "./Unauthorized";
import { FaWindowClose } from "react-icons/fa";

const ReportList = () => {
  const [data, setData] = useState([]);
  const [close, setClose] = useState([]);

  const { currentUser } = useContext(userContext);

  const role = currentUser?.role;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/trades/get-trade`
        );

        if (!response) {
          console.log("Something went wrong");
        }

        const res = response?.data;

        setClose(res.filter((item) => item.status === "close"));
        setData(res.filter((item) => item.status === "open"));
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getData();
  }, []);

  const changeCurrentPrice = (e, id) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return prevData.map((item) =>
        item._id === id ? { ...item, [name]: value } : item
      );
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/trades/update-trade`,
        { trades: data }
      );

      if (response.status === 200) {
        console.log("Updated successfully");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleClose = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/trades/closed-trade/${id}`,
        { status: "close" }
      );

      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item._id !== id));
        setClose((prevClose) => [
          ...prevClose,
          ...data.filter((item) => item._id === id),
        ]);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <section className="container">
      <div className="report__container">
        <div className="register__content report__header">
          <h3> OUR POSITIONS IN MARKET </h3>
        </div>

        <div className="report__position">
          <p className="open__position"> # Open positions</p>
          <button
            className="btn password-btn report-btn"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
        <div className="report__content">
          {role === "admin" ? (
            <>
              <div className="all_user_content">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Stop Loss</th>
                      <th scope="col">Base Price</th>
                      <th scope="col">Target Price</th>
                      <th scope="col">Type</th>
                      <th scope="col">Unrealized Gain (%)</th>
                      <th scope="col">Current Price</th>
                      <th scope="col">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      (
                        {
                          _id: id,
                          type,
                          companyName,
                          stopLoss,
                          basePrice,
                          currentPrice,
                          target,
                        },
                        index
                      ) => {
                        const unrealizedGainPercentage =
                          type === "buy"
                            ? ((currentPrice - basePrice) / basePrice) * 100
                            : ((basePrice - currentPrice) / basePrice) * 100;

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{companyName}</td>
                            <td>
                              <input
                                type="number"
                                name="stopLoss"
                                value={stopLoss}
                                onChange={(e) => changeCurrentPrice(e, id)}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="basePrice"
                                value={basePrice}
                                onChange={(e) => changeCurrentPrice(e, id)}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="target"
                                value={target}
                                onChange={(e) => changeCurrentPrice(e, id)}
                              />
                            </td>
                            <td className={type === "buy" ? "profit" : "loss"}>
                              {type}
                            </td>
                            <td
                              className={
                                unrealizedGainPercentage >= 0
                                  ? "profit"
                                  : "loss"
                              }
                            >
                              {unrealizedGainPercentage.toFixed(2)}%
                            </td>
                            <td>
                              <input
                                type="text"
                                name="currentPrice"
                                value={currentPrice}
                                onChange={(e) => changeCurrentPrice(e, id)}
                              />
                            </td>
                            <td>
                              <FaWindowClose
                                className="icons"
                                onClick={() => handleClose(id)}
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <Unauthorized />
          )}
        </div>
        <div className="report__position" style={{ marginTop: "5rem" }}>
          <p className="open__position" style={{ color: "red" }}>
            {" "}
            # Close positions
          </p>
        </div>
        <div className="report__content">
          {role === "admin" ? (
            <>
              <div className="all_user_content">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Stop Loss</th>
                      <th scope="col">Base Price</th>
                      <th scope="col">Target Price</th>
                      <th scope="col">Type</th>
                      <th scope="col">Realized Gain (%)</th>
                      <th scope="col">Current Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {close.map(
                      (
                        {
                          _id: id,
                          type,
                          companyName,
                          stopLoss,
                          basePrice,
                          currentPrice,
                          target,
                        },
                        index
                      ) => {
                        const realizedGainPercentage =
                          type === "buy"
                            ? ((currentPrice - basePrice) / basePrice) * 100
                            : ((basePrice - currentPrice) / basePrice) * 100;

                        return (
                          <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{companyName}</td>
                            <td>{stopLoss}</td>
                            <td>{basePrice}</td>
                            <td>{target}</td>
                            <td className={type === "buy" ? "profit" : "loss"}>
                              {type}
                            </td>
                            <td
                              className={
                                realizedGainPercentage >= 0 ? "profit" : "loss"
                              }
                            >
                              {realizedGainPercentage.toFixed(2)}%
                            </td>
                            <td>{currentPrice}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <Unauthorized />
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportList;
