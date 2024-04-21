import { createContext, useState, useEffect } from "react";



/*
     This component will contain the user details and provide the user information to all the components.so that each component can have the actual permission of the content, whether this user can access this component or not.
*/




export const userContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userContext.Provider>
  );
};
