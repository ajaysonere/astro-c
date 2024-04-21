import { useState } from "react";
import register from "/register.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


/*
    In this register component we will get the user details like name , email , password , phone number , address. we will get this data and send it to the server on server and store the user data and for the email verification we send the verification link to the user email , only after the email verification we can login into the account, without the email verification user will not able to login into the account.
    
*/



const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [phone, setPhone] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [success , setSuccess] = useState(false);

  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputChangePhone = (e) => {
    setPhone(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, address } = formData;

    if (!name || !email || !address || !phone || !password) {
      setError("Please Fill All Fields");
    } else if (name.length <= 2) {
      setError("Name should be more than 2 characters ");
    } else if (address.length <= 5) {
      setError("Address must be 5 characters long ");
    } else if (validateEmail(email) === false) {
      setError("Please Enter valid email address");
    } else if (phone.length > 14) {
      setError("phone number should be less than 15");
    } else if (password.length < 8) {
      setError(" password must have characters long ");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register`,
        { name, email, password, phone, address }
      );

      if (response.status == 201) {
        setSuccess(true);
        setError("Please , verify your email address");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  

  return (
    <section className="container">
      <div className="register__container">
        <div className="left__register">
          <img src={register} alt="register" />
        </div>
        <div className="right__register">
          <div className="register__contant">
            {error && (
              <p className={"failed"}>{error}</p>
            )}
            <h3> Create an account </h3>
          </div>
          <div className="form__container">
            <form className="form register__form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={inputChangeHandler}
              ></input>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={inputChangeHandler}
              ></input>
              <input
                type="tel"
                placeholder="91XXXXXXXX"
                name="phone"
                onChange={inputChangePhone}
                className={phone.length >= 14 ? "red" : "gray"}
              ></input>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={inputChangeHandler}
              ></input>
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={inputChangeHandler}
              />
              <button type="submit" className="btn password-btn">
                Register
              </button>
            </form>
          </div>
          <p className="register__login">
            Already have an account ?
            <Link to={"/login"} style={{ color: "blue", fontSize: "1.1rem" }}>
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
