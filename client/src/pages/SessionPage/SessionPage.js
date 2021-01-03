import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import "./SessionPage.css";
import OptionSelect from "../../components/OptionSelect/OptionSelect";

let socket;

const SessionPage = ({ location }) => {
  const { userData } = useContext(UserContext);
  const [ready, setReady] = useState(false);
  const { creator, roomCode } = queryString.parse(location.search);
  const history = useHistory();
  const ENDPOINT =
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : "localhost:5000";

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
    socket.on("usersReady", (ready) => {
      if (creator === "false") {
        setReady(true);
      }
    });
  }, [ENDPOINT]);

  return (
    <div className="session-page page">
      <div className="session-page__room-info-container">
        <div className="session-page__room-info">
          <h2>Room Info</h2>
          <p>
            <b>Role:</b> {creator === "true" ? "Admin" : "User"}
          </p>
          <p>
            <b>Room Code:</b> {room}
          </p>
          <p>
            <b>Room Members:</b>
          </p>
          <ul id="users"></ul>
        </div>
      </div>
      {creator === "true" ? (
        <OptionSelect room={room} creator={creator} />
      ) : (
        <div className="session-page__start-message">
          <p>
            The Start button will appear once the admin is finished selecting
            your group's filters
          </p>
        </div>
      )}
      {ready && (
        <form className="session-page__start-button form">
          <input
            type="submit"
            value="Start"
            onClick={() =>
              history.push(`/results?roomCode=${room}&&creator=${creator}`)
            }
          />
        </form>
      )}
    </div>
  );
};

export default SessionPage;
