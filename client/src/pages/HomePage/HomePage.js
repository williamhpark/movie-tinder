import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const HomePage = (props) => {
  const { userData } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    // If a user is not logged in, redirect them to the Login Page
    if (!userData.user) {
      history.push("/login");
    }
  });

  const startSession = () => {
    history.push("/options");
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={startSession}>Start Session</button>
    </div>
  );
};

export default HomePage;
