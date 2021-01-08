import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./HomePage.css";
import { UserContext } from "../../context/UserContext";

const HomePage = (props) => {
  const { userData } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    // If a user is not logged in, redirect them to the Login Page
    if (!userData.user) {
      history.push("/login");
    }
  }, [userData.user]);

  return (
    <div className="page home-page">
      <div className="home-page__container">
        <h1 className="home-page__title">Welcome to flicker!</h1>
        <h3 className="home-page__description">
          Start your own session, or join someone else's session
        </h3>
        <div className="home-page__button-row">
          <button onClick={() => history.push("/session?creator=true")}>
            Start Session
          </button>
          <button onClick={() => history.push("/join")}>Join Session</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
