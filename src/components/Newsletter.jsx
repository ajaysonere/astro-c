import { useContext, useState } from "react";
import { userContext } from "../contexts/UserContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import ShowNewsletter from "./ShowNewsletter";

/*
    This componet will help us to upload the news letter on the server , and fetch all the news-letter from the server. we get all the information about the news letter and we can open it in new tab.
    
*/

const Newsletter = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [success , setSuccess] = useState(false);
  const { currentUser } = useContext(userContext);

  const role = currentUser?.role;
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch all the news letter from server
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin/get-news-letter`
        );

        if (response.status === 200) {
          setData(response?.data);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    getData();
  }, [success]);

  // upload the news letter on server
  const handleUploadNewsLetter = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin/news-letter-upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setError("News-Letter uploaded successfully");
        setSuccess(true);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="container">
      <div className="news-letter__container">
        {error && (
          <p
            className={"failed"}
            style={{
              width: "50rem",
              textAlign: "center",
              margin: " 2rem auto",
            }}
          >
            {error}
          </p>
        )}
        {role === "admin" && (
          <div className="upload__newsletter">
            <form
              className="form__controller"
              onSubmit={handleUploadNewsLetter}
            >
              <input
                type="file"
                name="news-letter"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <button type="submit" className="btn password-btn">
                upload
              </button>
            </form>
          </div>
        )}
        <div className="news-letter__heading">
          <h3> News-Letter </h3>
        </div>
        {role === "news-letter" || role === "signals" || role === "admin" ? (
          <div className="news-letter__contant">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ name, createdAt }, index) => {
                  const dateValue = new Date(createdAt).toLocaleDateString();
                  return (
                    <tr scope="row" key={index}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{dateValue}</td>
                      <td>
                        <Link to={`/show-pdf/${name}`}>Open News-Letter</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Unauthorized />
        )}
      </div>
    </section>
  );
};

export default Newsletter;
