import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    const loginUser = { email, password };
    const loginRes = await axios.post(
      "http://localhost:5000/api/users/login",
      loginUser
    );
    // Update the UserContext state
    setUserData({ token: loginRes.data.token, user: loginRes.data.user });
    // Set the auth-token in the browser
    localStorage.setItem("auth-token", loginRes.data.token);

    // Redirect user to the Option Select page
    history.push("/options");
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
