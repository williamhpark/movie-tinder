import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import "./JoinSessionPage.css";
import { UserContext } from "../../context/UserContext";
import ErrorNotice from "../../components/auth/ErrorNotice/ErrorNotice";

let socket;

const JoinSessionPage = (props) => {
  const { userData } = useContext(UserContext);
  const [roomCode, setRoomcode] = useState("");
  const [found, setFound] = useState("");
  const ENDPOINT = "localhost:5000";
  const history = useHistory();
  console.log(userData.user);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  const submit = async (e) => {
    e.preventDefault();

    if (roomCode) {
      socket.emit("userJoin", roomCode, { user: userData.user }, () =>
        setRoomcode("")
      );

      socket.on("roomNotFound", (roomFound, roomID) => {
        setFound(roomFound);
        if (roomFound === "Room Found") {
          history.push(`/session?creator=false&&roomCode=${roomID}`);
        }
      });
    }
  };
  return (
    <div className="page">
      <form className="join-session-page__form form" onSubmit={submit}>
        <label htmlFor="room-code">Room code</label>
        <input
          id="room-code"
          type="text"
          value={roomCode}
          onChange={(e) => setRoomcode(e.target.value)}
        />
        <input type="submit" value="Enter" />
      </form>
      {found && (
        <ErrorNotice message={found} clearError={() => setFound(undefined)} />
      )}
    </div>
  );
};

export default JoinSessionPage;
