const sessions = [];

// creating an array of sessions
const sessionCreate = (roomCode, userid) => {
  console.log(roomCode);
  console.log(userid);
  const session = {
    roomCode,
    creatorid: userid,
    users: [],
    result: [],
  };

  sessions.push(session);
  return session;
};

const getSession = (roomCode) => {
  return sessions.find((session) => session.roomCode === roomCode);
};

const getRoomUsers = (roomCode) => {
  const session = sessions.find((session) => session.roomCode === roomCode);
  return session.users;
};

module.exports = {
  sessionCreate,
  getSession,
  getRoomUsers,
};
