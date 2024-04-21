import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


/*
    This update user component gives the accsss to the admin, so that admin can update the details of any user in web app.
*/




const Updateuser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin/get-user/${id}`
        );

        if (response.status === 200) {
          const userData = response.data;
          setFormData({
            name: userData.name,
            email: userData.email,
            password: "",
            address: userData.address,
            role: userData.role,
          });
          setPhone(userData.phone);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, [id]);

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const { name, email, password, address } = formData;

    // Validation checks...

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin/update-user/${id}`,
        { name, email, phone, address, role: formData.role }
      );

      if (response.status === 200) {
        navigate("/admin/all-users");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="container">
      <div className="register__container create__user_container">
        <div className="create__user">
          <div className="register__content">
            <h3> Update User </h3>
            {error && <p className="failed">{error}</p>}
          </div>
          <div className="form__container">
            <form className="form register__form" onSubmit={handleSubmit}>
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
                placeholder="Password"
                name="password"
                onChange={inputChangeHandler}
              ></input>
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={inputChangeHandler}
              />
              <select value={formData.role} onChange={handleRoleChange}>
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="news-letter">News-Letter</option>
                <option value="signals">Signals</option>
              </select>
              <button type="submit" className="btn password-btn">Update User</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updateuser;
