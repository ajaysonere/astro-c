import companyLogo from "/company-logo.png";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { userContext } from "../contexts/UserContext";
import { IoHome } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaTowerBroadcast } from "react-icons/fa6";
import { FaUnlockAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbReportMoney } from "react-icons/tb";

/*
    In the Navbar component we will render the navbar according the user , as instace if user is admin then we will render the all the functionalities to the admin , or if our user is normal user then we do not share the all the links or do not give the access to the other fuctionalities.
*/

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { currentUser } = useContext(userContext);

  const role = currentUser?.role;
  const name = currentUser?.name;
  // eslint-disable-next-line no-unused-vars
  const token = currentUser?.token;

  const handleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav>
      <div className="container nav__container">
        <NavLink to="/" className="nav__logo">
          <img src={companyLogo}></img>
        </NavLink>
        {/* If user is admin then we will show the admin navbar otherwise we will show the simple user navbar */}
        {role === "admin" ? (
          <>
            <ul className={`nav__menu ${showNavbar ? "" : "show"}`}>
              <li>
                <NavLink to={`/`}>
                  {" "}
                  <IoHome className="nav__icons" />{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/news-letter">
                  {" "}
                  <FaNewspaper className="nav__icons" />{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/signals"}>
                  {" "}
                  <FaTowerBroadcast className="nav__icons" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/create-trade">
                  {" "}
                  <IoIosCreate className="nav__icons" />{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/all-users">
                  {" "}
                  <FiUsers className="nav__icons" />{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/report"}>
                  <TbReportMoney className="nav__icons" />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/logout"} style={{ color: "white" }}>
                  <p className="hero-icons ">{name[0]}</p>
                </NavLink>
              </li>
            </ul>
            <button className="nav__toggle-btn" onClick={() => handleNavbar()}>
              {showNavbar ? <AiOutlineClose /> : <FaBarsStaggered />}
            </button>
          </>
        ) : (
          <>
            <ul className={`nav__menu ${showNavbar ? "" : "show"}`}>
              <li>
                <NavLink to={`/`}>
                  {" "}
                  <IoHome className="nav__icons" />{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/news-letter">
                  {" "}
                  <FaNewspaper className="nav__icons" />{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/signals"}>
                  {" "}
                  <FaTowerBroadcast className="nav__icons" />
                </NavLink>
              </li>
              {role === "user" ||
              role === "news-letter" ||
              role === "signals" ? (
                <li>
                  <NavLink to={"/logout"} style={{ color: "white" }}>
                    <p className="hero-icons ">{name[0]}</p>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/register" className="authors">
                    <FaUnlockAlt className="nav__icons" />
                  </NavLink>
                </li>
              )}
            </ul>
            <button className="nav__toggle-btn" onClick={() => handleNavbar()}>
              {showNavbar ? <AiOutlineClose /> : <FaBarsStaggered />}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
