import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

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

  const enterRoom = (event) => {
    event.preventDefault();

    if (roomCode) {
      socket.emit("userJoin", roomCode, { user: userData.user }, () =>
        setRoomcode("")
      );

      socket.on("roomNotFound", (roomFound, roomID) => {
        setFound(roomFound);
        if (roomFound == "Room Found") {
          history.push(`/session?creator=false&&roomCode=${roomID}`);
        }
      });
    }
  };
  return (
    <div>
      <input
        value={roomCode}
        onChange={(event) => setRoomcode(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? enterRoom(event) : null
        }
      />
      {found && (
        <ErrorNotice message={found} clearError={() => setFound(undefined)} />
      )}
    </div>
  );
};

export default JoinSessionPage;
