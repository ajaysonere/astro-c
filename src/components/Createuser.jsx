import { useState , useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../contexts/UserContext";



/*
    This component help us to create the users in web app , this will only accessable to admin , admin can create the user from the web app and can give the user details to clients.

 */



const Register = () => {
  // state for storing the user data 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user", // Default role
  });

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {currentUser} = useContext(userContext);
  
  const token = currentUser?.token;
  const role = currentUser?.role;
  
  
  useEffect(() => {
      if(!token){
         navigate("/login");
      }
  } , [])

  // validate email 
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // for handling the input change
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

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };
  
  
  // handle the submit data and send the api request to server for store the user in database
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, address } = formData;

    if (!name || !email || !address || !phone || !password) {
      setError("Please Fill All Fields");
      return; // Return to prevent further execution
    } else if (name.length <= 2) {
      setError("Name should be more than 2 characters ");
    } else if (address.length <= 5) {
      setError("Address must be 5 characters long ");
    } else if (validateEmail(email) === false) {
      setError("Please Enter a valid email address");
    } else if (phone.length > 14) {
      setError("Phone number should be less than 15");
    } else if (password.length < 8) {
      setError("Password must have at least 8 characters");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register`,
        { name, email, password, phone, address, role: formData.role }
      );

      if (response.status === 201) {
        navigate("/admin/all-users");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="container">
      {role == "admin" && <div className="register__container create__user_container ">
        <div className="create__user">
          <div className="register__contant">
            {error && <p className="failed">{error}</p>}
            <h3> Register New User </h3>
          </div>
          <div className="form__container">
          {/* Form for handling the user information */}
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
              <select value={formData.role} onChange={handleRoleChange}>
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="news-letter" >News-Letter</option>
                <option value="signals">Signals</option>
              </select>
              <button type="submit" className="btn password-btn">Create User</button>
            </form>
          </div>
        </div>
      </div>}
    </section>
  );
};

export default Register;
