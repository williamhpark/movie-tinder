import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import ErrorNotice from "../../components/auth/ErrorNotice/ErrorNotice";

const LoginPage = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(undefined);

  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/login",
        loginUser
      );
      // Update the UserContext state
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      console.log(userData);
      // Set the auth-token in the browser
      localStorage.setItem("auth-token", loginRes.data.token);

      // Redirect user to the Home page
      history.push("/");
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
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

      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
    </div>
  );
};

export default LoginPage;
