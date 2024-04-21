import { MdVerified } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/*
    In this verify Email component , we verify the email of user , at the time of registration we sent the verification mail to user , when user will click on that link , this component will help us to verify the email. 
*/

const VerifyEmail = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { token } = useParams();

  //   this useEffect will help to verify the token when we render it first time ,and if our token is correct it will show the our email is verified
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/users/verify-email/${token}`
        );

        if (!response) {
          setError("Something went wrong");
        }

        setSuccess(true);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      {success === true ? (
        <div className="verify__container">
          <MdVerified className="verified__icon" />
          <h4 style={{ fontSize: "1.5rem" }}>Email Verified </h4>
          <p style={{ fontSize: "1.1rem" }}>Your email has been verified </p>
          <p style={{ fontSize: "1.1rem" }}>
            Now you can login with your new account{" "}
          </p>
          <Link to={"/login"} className="btn password-btn verify-btn">
            Go Back{" "}
          </Link>
        </div>
      ) : (
        <div className="verify__container">
          <p style={{ fontSize: "1.3rem" }}>{error}</p>
        </div>
      )}
    </section>
  );
};

export default VerifyEmail;
