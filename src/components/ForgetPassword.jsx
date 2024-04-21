import { useState } from "react";
import axios from "axios";



/*

     This the forget password component , in this component we give the registered email address and if our email is present in database user will get the forget password link if not user have to register first. if user will get the forget password mail on email , after clicking the reset link they can forget password.


 */



const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  //  handling the mail for send verify link
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // making request to get the reset password link on email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/forget-password`,
        { email }
      );

      if (response.status === 200) {
        setError("Please Check your mail for verification !");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="container">
      <div className="forget__container">
        <div className="register__contant">
          <h3 className="cant__login"> Can not Login ?</h3>
          <p className="cant__login__para">
            Do not worry , Enter your Registered email address <br /> here and
            reset your password.
          </p>
        </div>
        <div className="forget__content">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
            <button className="btn password-btn">Reset Password</button>
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

export default ForgetPassword;
