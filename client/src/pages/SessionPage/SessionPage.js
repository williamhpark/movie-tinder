import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import queryString from "query-string";
import io from "socket.io-client";

import OptionSelect from "../../components/options/OptionSelect/OptionSelect";

let socket;

const SessionPage = ({ location }) => {
  const { userData } = useContext(UserContext);
  const { creator, roomCode } = queryString.parse(location.search);
  const ENDPOINT = "localhost:5000";
  const history = useHistory();
  let room;

  const outputUsers = (roomUsers) => {
    document.getElementById("users").innerHTML = `
      ${roomUsers.map((user) => `<li>${user.name}</li>`).join("")}
  `;
  };

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

    socket.emit("sessioncreate", room, creator, { user: userData.user });

    socket.on("roomUsers", (users) => {
      outputUsers(users);
    });
  }, [ENDPOINT]);

  return (
    <div className="page">
      <h1>{room}</h1>
      <h1>Session</h1>
      <ul id="users"></ul>
      <button
        style={{ position: "absolute", bottom: "0" }}
        onClick={() =>
          history.push(`/results?room=${room}&&creator=${creator}`)
        }
      >
        this is button{" "}
      </button>

      {creator === "true" && <OptionSelect room={room} creator={creator} />}
    </div>
  );
};

export default SessionPage;
