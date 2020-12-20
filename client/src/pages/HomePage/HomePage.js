import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <h2>Home</h2>
      <Link to={`/session?creator=true`}>
        <button>Start Session</button>
      </Link>
      <button onClick={() => history.push("/join")}>Join session</button>
    </div>
  );
};

export default HomePage;
