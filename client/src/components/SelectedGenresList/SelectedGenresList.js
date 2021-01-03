import React, { useContext } from "react";

import "./SelectedGenresList.css";
import { ShowContext } from "../../context/ShowContext";
import SelectedGenreItem from "../SelectedGenreItem/SelectedGenreItem";

const SelectedGenresList = (props) => {
  const { showData } = useContext(ShowContext);

  return (
    <div className="selected-genres-list">
      <p>
        <b>Selected</b>
      </p>
      {showData.selectedGenres.length === 0 ? (
        <p>No genres selected</p>
      ) : (
        showData.selectedGenres.map((genre) => {
          return <SelectedGenreItem genre={genre} />;
        })
      )}
    </div>
  );
};

export default SelectedGenresList;
