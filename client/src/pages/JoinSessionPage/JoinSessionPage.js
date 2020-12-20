import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import ErrorNotice from "../../components/auth/ErrorNotice/ErrorNotice";

let socket;

const JoinSessionPage = (props) => {
  const { userData } = useContext(UserContext);
  const [roomCode, setRoomcode] = useState("");
  const [error, setError] = useState("");
  const ENDPOINT = "localhost:5000";
  const userID = userData.user.id;
  const history = useHistory();

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  const enterRoom = (event) => {
    event.preventDefault();
    console.log("hello");

    if (roomCode) {
      socket.emit("userJoin", roomCode, userID, () => setRoomcode(""));
      socket.on("roomNotFound", (error) => {
        setError(error);
      });
    }
  };

  console.log(roomCode);
  return (
    <div>
      <input
        value={roomCode}
        onChange={(event) => setRoomcode(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? enterRoom(event) : null
        }
      />
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
    </div>
  );
};

export default JoinSessionPage;
