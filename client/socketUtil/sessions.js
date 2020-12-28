const sessions = [];

// creating an array of sessions
const sessionCreate = (roomcode, userid) => {
  console.log(roomcode);
  console.log(userid);
  const session = {
    roomcode,
    creatorid: userid,
    users: [],
    results: [],
  };
  sessions.push(session);
  return session;
};

const getSession = (roomcode) => {
  return sessions.find((session) => session.roomcode === roomcode);
};

const getRoomUsers = (roomcode) => {
  const session = sessions.find((session) => session.roomcode === roomcode);
  return session.users;
};

module.exports = {
  sessionCreate,
  getSession,
  getRoomUsers,
};
