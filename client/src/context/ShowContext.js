import React, { createContext, useState } from "react";

const ShowContext = createContext([{}, () => {}]);

const ShowProvider = ({ children }) => {
  const [state, setState] = useState({
    isMovie: false,
    isSeries: false,
    selectedGenres: [],
  });

  return (
    <ShowContext.Provider value={[state, setState]}>
      {children}
    </ShowContext.Provider>
  );
};

export { ShowContext, ShowProvider };
