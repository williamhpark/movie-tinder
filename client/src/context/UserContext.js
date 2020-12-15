import { createContext, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
