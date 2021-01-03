import React, { useEffect, useContext, useState } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import queryString from "query-string";

import "./WaitingPage.css";

let socket;

const WaitingPage = ({ location }) => {
  const history = useHistory();
  const { roomCode } = queryString.parse(location.search);
  const { userData } = useContext(UserContext);
  const [ready, setReady] = useState(false);
  // const ENDPOINT = "localhost:5000";
  const ENDPOINT = "https://flicker-paul-will.herokuapp.com:38207";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("waiting", roomCode, { user: userData.user });
    socket.on("done", () => {
      setReady(true);
    });
  }, [ENDPOINT]);

  return (
    <div className="waiting-page page">
      <div className="waiting-page__message">
        <h1>Welcome to the waiting room</h1>
        <h2>Please wait for everyone to finish their selections</h2>
      </div>
      {ready && (
        <div className="waiting-page__button-container">
          <h3>You may now continue to the final recommendations</h3>
          <form className="waiting-page__next-button form">
            <input
              type="submit"
              value="Next"
              onClick={() => history.push(`/final`)}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default WaitingPage;
