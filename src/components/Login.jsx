/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import login from "/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../contexts/UserContext";




/*

    This Login component help us login in our web app , it will get our email and password with that credentials , it will make in api request to server , if our name and password in correct , then it will set the user details to the user context and we can access the user details to everywhere in our web app.

*/


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!password || !email) {
      setError("Please Fill All Fields");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/login`,
        formData
      );

      setCurrentUser(response?.data);

      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="container">
      <div className="register__container">
        <div className="left__register">
          <img src={login} alt="register" />
        </div>
        <div className="right__register">
          <div className="register__contant">
            {error && <p className="failed">{error}</p>}
            <h3> Login into your account </h3>
            <p className="register__login">
              Don't have an account ?{" "}
              <Link
                to={"/register"}
                style={{ color: "blue", fontSize: "1.1rem" }}
              >
                Register
              </Link>
            </p>
          </div>
          <div className="form__container">
            <form className="form register__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={inputChangeHandler}
              ></input>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={inputChangeHandler}
              ></input>
              <button type="submit" className="btn password-btn">
                Login
              </button>
            </form>
          </div>
          <Link
            to={"/forget-password"}
            className="links__form"
            style={{ color: "#000", fontSize: "1.1rem" }}
          >
            Forget Password ?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
