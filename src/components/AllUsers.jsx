import { useState, useEffect, useContext } from "react";
import { userContext } from "../contexts/UserContext"; 
import axios from "axios"; 
import { Link } from "react-router-dom"; 
import Unauthorized from "./Unauthorized"; 
import { MdDelete } from "react-icons/md"; 
import { MdDriveFileRenameOutline } from "react-icons/md";


/*
     This component will show the all users data to the admin , it will fetch all users data from the server. users data will contain username , email , address , phone number .
*/

const AllUsers = () => {
  const [data, setData] = useState([]); // State to store user data
  const [error, setError] = useState(""); // State to store error message
  const [changes, setChanges] = useState(false); // State to trigger data fetching
  const { currentUser } = useContext(userContext); // Getting current user context

  const role = currentUser?.role; // Extracting role from current user context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin/get-all-users`
        );

        if (!response) {
          setError("Failed to fetch data"); // Setting error message if data fetching fails
        }

        setData(response?.data); // Setting fetched user data
      } catch (error) {
        setError(error.response.data.message); // Setting error message if an error occurs during fetching
      }
    };

    fetchData(); // Fetching data when the component mounts or when 'changes' state changes
  }, [changes]);

  // Function to handle user deletion
  const handleUserDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin/delete-user/${id}`
      );

      if (response.status === 200) {
        setChanges((prev) => !prev); // Triggering data fetching after successful user deletion
      } else {
        setError("Failed to delete user"); // Setting error message if user deletion fails
      }
    } catch (error) {
      console.error("Error deleting user:", error); // Logging error if user deletion fails
      setError(error.response?.data?.message || "Failed to delete user"); // Setting error message if user deletion fails
    }
  };

  return (
    <section className="container">
      <div className="all_user_container">
        <div className="create-new-user"></div>
        <div className="news-letter__heading">
          {error && <p>{error}</p>} {/* Displaying error message if exists */}
          <h3>ALL Users</h3>
        </div>
        {role === "admin" ? ( // Checking if the user is an admin
          <>
            <div className="all_user_content">
              <Link
                to={"/admin/create-new-user"} // Link to create a new user
                className="btn  password-btn"
                style={{ marginBottom: "2rem" }}
              >
                Create New User
              </Link>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ _id: id, role, name, email, phone }, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{role}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>
                          <Link to={`/admin/update-user/${id}`}>
                            <MdDriveFileRenameOutline className="icons" />{" "}
                            {/* Icon for updating user */}
                          </Link>
                        </td>
                        <td>
                          <MdDelete
                            onClick={() => handleUserDelete(id)} // Handling user deletion
                            className="icons"
                          />{" "}
                          {/* Icon for deleting user */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Unauthorized /> // Displaying unauthorized message if the user is not an admin
        )}
      </div>
    </section>
  );
};

export default AllUsers;
