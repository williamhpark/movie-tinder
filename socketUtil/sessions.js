const sessions = [];

// creating an array of sessions
const sessionCreate = (roomCode, userid) => {
  const session = {
    roomCode,
    creatorid: userid,
    users: [],
    results: [],
    ready: false,
    waitingUsers: [],
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
