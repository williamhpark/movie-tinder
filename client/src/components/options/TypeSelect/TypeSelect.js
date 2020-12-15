import React, { useContext } from "react";

import "./TypeSelect.css";
import { ShowContext } from "../../../context/ShowContext";

const TypeSelect = (props) => {
  const [showData, setShowData] = useContext(ShowContext);

  const toggleIsMovie = () => {
    setShowData((prevData) => ({
      ...prevData,
      isMovie: !prevData.isMovie,
    }));
  };

  const toggleIsSeries = () => {
    setShowData((prevData) => ({
      ...prevData,
      isSeries: !prevData.isSeries,
    }));
  };

  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        onClick={() => toggleIsMovie()}
        type="checkbox"
        name="movie"
        checked={showData.isMovie}
      />
      <h1>Series</h1>
      <input
        onClick={() => toggleIsSeries()}
        type="checkbox"
        name="series"
        checked={showData.isSeries}
      />
    </div>
  );
};

export default TypeSelect;
