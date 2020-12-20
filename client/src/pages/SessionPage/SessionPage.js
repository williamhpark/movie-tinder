import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import io from "socket.io-client";

let socket;

const SessionPage = () => {
  const { userData } = useContext(UserContext);
  const ENDPOINT = "localhost:5000";
  const userID = userData.user.id;

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(room);
    console.log(userID);
    socket.emit("sessioncreate", { room, userID });
  }, [ENDPOINT]);

  const history = useHistory();

  let room =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  room = room.slice(0, 6);

  return (
    <div>
      <h1>{room}</h1>
      <h1>Session</h1>
      <button onClick={() => history.push("/options")}>Start</button>
    </div>
  );
};

export default SessionPage;
