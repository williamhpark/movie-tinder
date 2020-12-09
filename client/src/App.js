import React, { useState } from "react";

import "./App.css";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";

const App = () => {
  const [isMovie, setIsMovie] = useState(false);
  const [isSeries, setIsSeries] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div>
      <OptionSelectPage
        isMovie={isMovie}
        setIsMovie={setIsMovie}
        isSeries={isSeries}
        setIsSeries={setIsSeries}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    </div>
  );
};

export default App;
