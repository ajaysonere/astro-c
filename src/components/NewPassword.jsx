import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


/* 
    This component will help us to reset the password after the verify the email in forget password component . this wiil take the token and verify it and if token is valid then it will take the new password and confirm password and set the new password for the user.
*/


const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { token } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // making request for reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/reset-password`,
        { token: token, password, confirmPassword }
      );

      if (response.status === 200) {
        setError("You have successfully changed your password");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="container">
      <div className="forget__container">
        <div className="register__contant">
          <h3 style={{ fontSize: "1.8rem" }}> Reset Your Password </h3>
          <p style={{ fontSize: "1rem" }}>
            Enter your new password and login using this credentials.
          </p>
        </div>
        <div className="forget__content reset__container">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="New Password"
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password "
              onChange={handleConfirmPasswordChange}
            />
            <button className="btn password-btn reset-btn">
              {" "}
              Reset Password{" "}
            </button>
          </form>
          {error && (
            <p className="verify__message failed" style={{ marginTop: "2rem" }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewPassword;
