import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./AuthOptions.css";
import { UserContext } from "../../context/UserContext";

const AuthOptions = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const register = () => {
    history.push("/register");
  };
  const login = () => {
    history.push("/login");
  };
  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
    // Redirect user to the Home Page
    history.push("/");
  };

  useEffect(() => {
    if (userData.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userData.user]);

  return (
    <nav className="auth-options">
      {loggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
