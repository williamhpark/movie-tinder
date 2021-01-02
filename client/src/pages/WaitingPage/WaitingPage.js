import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import queryString from "query-string";

let socket;

const WaitingPage = ({ location }) => {
  const history = useHistory();
  const ENDPOINT = "localhost:5000";
  const { roomCode } = queryString.parse(location.search);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("waiting", roomCode, { user: userData.user });
    socket.on("done", () => {
      document.getElementById("ready").style.display = "block";
      document.getElementById("text1").innerHTML =
        "You may now continue to the results";
      document.getElementById("text2").innerHTML = "";
    });
  }, [ENDPOINT]);

  return (
    <div>
      <h1 id="text1" style={{ paddingTop: "50px", display: "block" }}>
        Welcome to the waiting room
      </h1>
      <h1 id="text2" style={{ display: "block" }}>
        {" "}
        Please wait for your friends to finish swiping
      </h1>
      <button
        id="ready"
        style={{
          position: "absolute",
          bottom: "0",
          display: "none",
          fontSize: "40px",
        }}
        onClick={() => history.push(`/final`)}
      >
        {" "}
        this is button
      </button>
    </div>
  );
};

export default WaitingPage;
