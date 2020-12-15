import React from "react";
import { useHistory } from "react-router-dom";

import "./AuthOptions.css";

const AuthOptions = (props) => {
  const history = useHistory();

  const register = () => {
    history.push("/register");
  };
  const login = () => {
    history.push("/login");
  };

  return (
    <nav className="auth-options">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </nav>
  );
};

export default AuthOptions;
