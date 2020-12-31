import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import "./SessionPage.css";
import OptionSelect from "../../components/OptionSelect/OptionSelect";

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
    localStorage.setItem("room-id", room);
    socket = io(ENDPOINT);
    socket.emit("sessioncreate", room, creator, { user: userData.user });
    socket.on("roomUsers", (users) => {
      outputUsers(users);
    });
  }, [ENDPOINT]);

  return (
    <div className="session-page page">
      <div className="session-page__room-info-container">
        <div className="session-page__room-info">
          <h2>Room Info</h2>
          {creator === "true" ? (
            <p>
              <b>Role:</b> Admin
            </p>
          ) : (
            <p>
              <b>Role:</b> User
            </p>
          )}
          <p>
            <b>Room Code:</b> {room}
          </p>
          <p>
            <b>Room Members:</b>
          </p>
          <ul id="users"></ul>
        </div>
      </div>
      <button
        style={{ position: "absolute", bottom: "0" }}
        onClick={() =>
          history.push(`/results?roomCode=${room}&&creator=${creator}`)
        }
      >
        this is button
      </button>
      {creator === "true" && <OptionSelect room={room} creator={creator} />}
    </div>
  );
};

export default SessionPage;
