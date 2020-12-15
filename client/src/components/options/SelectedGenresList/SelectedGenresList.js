import React, { useContext } from "react";

import "./SelectedGenresList.css";
import { ShowContext } from "../../../context/ShowContext";
import SelectedGenreItem from "../SelectedGenreItem/SelectedGenreItem";

const SelectedGenresList = (props) => {
  const [showData, setShowData] = useContext(ShowContext);
  return (
    <div id="selected-genres-container">
      <h2>Selected Genres</h2>
      {showData.selectedGenres.map((genre) => {
        return <SelectedGenreItem genre={genre} />;
      })}
    </div>
  );
};

export default SelectedGenresList;
