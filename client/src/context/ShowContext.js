import React, { createContext, useState } from "react";

const ShowContext = createContext([{}, () => {}]);

const ShowProvider = ({ children }) => {
  const [showData, setShowData] = useState({
    isMovie: false,
    isSeries: false,
    selectedGenres: [],
  });

  return (
    <ShowContext.Provider value={[showData, setShowData]}>
      {children}
    </ShowContext.Provider>
  );
};

export { ShowContext, ShowProvider };
