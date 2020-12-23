import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import queryString from "query-string";

import io from "socket.io-client";

let socket;

const SessionPage = ({ location }) => {
  const { userData } = useContext(UserContext);
  const ENDPOINT = "localhost:5000";
  const history = useHistory();

  const outputUsers = (roomUsers) => {
    document.getElementById("users").innerHTML = `
      ${roomUsers.map((user) => `<li>${user.name}</li>`).join("")}
  `;
  };

  let room;

  const { creator, roomCode } = queryString.parse(location.search);
  if (creator === "true") {
    room =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    room = room.slice(0, 6);
  } else {
    room = roomCode;
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(creator);
    console.log(room);
    socket.emit("sessioncreate", room, creator, { user: userData.user });

    socket.on("roomUsers", (users) => {
      outputUsers(users);
    });
  }, [ENDPOINT]);

  return (
    <div>
      <h1>{room}</h1>
      <h1>Session</h1>
      <ul id="users"></ul>
      <button onClick={() => history.push("/options")}>Start</button>
    </div>
  );
};

export default SessionPage;
