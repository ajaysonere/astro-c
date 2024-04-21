import { useState, useContext, useEffect } from "react";
import { userContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


/*
    This logout component will handle the logout and user details , where in one click user can logout from the web app and can update the user details including the name , password , address , phone number . 
    
    
*/



const Logout = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);

  // eslint-disable-next-line no-unused-vars
  const name = currentUser?.name;
  // eslint-disable-next-line no-unused-vars
  const email = currentUser?.email;
  const id = currentUser?.id;
  const token = currentUser?.token;
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    address: "",
    role: "user",
  });

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
     if(!token){
        navigate("/login");
     }
  } , [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/get-user/${id}`
        );


        if (response.status === 200) {
          const userData = response.data.data;
          setFormData({
            name: userData.name,
            email: userData.email,
            address: userData.address,
          });
          setPhone(userData.phone);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  // this will  handle the user update user request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, address, password , newPassword, confirmPassword } = formData;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/update-user/${id}`,
        { name, email, phone, address, password, newPassword, confirmPassword }
      );

      if(response.status === 200){
        setError("User updated successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="container">
      <div className="logout__container">
        <div className="logout__heading">
          {error && <p className="failed">{error}</p>}
          <h2>Personal Information</h2>
        </div>
        <div className="logout__content">
          <form
            className="form register__form logout__form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={inputChangeHandler}
            ></input>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={inputChangeHandler}
              readOnly
            ></input>
            <input
              type="tel"
              placeholder="91XXXXXXXX"
              name="phone"
              value={phone}
              onChange={inputChangePhone}
              className={phone.length >= 14 ? "red" : "gray"}
            ></input>
            <input
              type="password"
              placeholder="Current Password"
              name="password"
              value={formData.password}
              onChange={inputChangeHandler}
            ></input>
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={inputChangeHandler}
            ></input>
            <input
              type="password"
              placeholder="confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={inputChangeHandler}
            ></input>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={inputChangeHandler}
            />
            <button type="submit" className="btn password-btn">
              Update User
            </button>
          </form>
          <button
            className="btn password-btn logout__btn"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Logout;
