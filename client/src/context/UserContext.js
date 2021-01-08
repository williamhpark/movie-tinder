import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");

    // Checking if the auth-token key does not exist in local storage
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    // Check if the token is valid
    const tokenRes = await axios.post("/api/users/isTokenValid", null, {
      headers: { "x-auth-token": token },
    });
    // If the token exists, retreive the user's data
    if (tokenRes.data) {
      const userRes = await axios.get("/api/users/loggedInUser", {
        headers: { "x-auth-token": token },
      });
      setUserData({ token, user: userRes.data });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
