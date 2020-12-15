import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./RegisterPage.css";
import { UserContext } from "../../context/UserContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password, passwordCheck };
    // Send the new user data to the /register API endpoint
    await axios.post("http://localhost:5000/api/users/register", newUser);
    const loginRes = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    // Update the UserContext state
    setUserData({ token: loginRes.data.token, user: loginRes.data.user });
    // Set the auth-token in the browser
    localStorage.setItem("auth-token", loginRes.data.token);

    // Redirect user to the Option Select page
    history.push("/options");
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterPage;
