const sessions = [];

// creating an array of sessions
const sessionCreate = (roomcode, userid) => {
  const session = {
    roomcode,
    creatorid: userid,
    users: [],
  };

  sessions.push(session);
  console.log(sessions);
  return session;
};

const getSession = (roomcode) => {
  return sessions.find((session) => session.roomcode === roomcode);
};

module.exports = {
  sessionCreate,
  getSession,
};
