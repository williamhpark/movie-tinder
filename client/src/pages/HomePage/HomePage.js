import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./HomePage.css";
import { UserContext } from "../../context/UserContext";
import Hero from "../../components/layout/Hero/Hero";

const HomePage = (props) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    // If a user is not logged in, redirect them to the Login Page
    if (!userData.user) {
      history.push("/login");
    }
  });

  return (
    <div className="login page ">
      <Hero text="Start your own session, or join someone else's session" />
      <div className="button-row">
        <button onClick={() => history.push("/session?creator=true")}>
          Start Session
        </button>
        <button onClick={() => history.push("/join")}>Join session</button>
      </div>
    </div>
  );
};

export default HomePage;
