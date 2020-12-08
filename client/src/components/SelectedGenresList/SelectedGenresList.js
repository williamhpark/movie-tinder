import React from "react";

import "./SelectedGenresList.css";
import SelectedGenreItem from "../SelectedGenreItem/SelectedGenreItem";

const SelectedGenresList = (props) => {
  return (
    <div id="selected-genres-container">
      <h2>Selected Genres</h2>
      {props.selectedGenres.map((genre) => {
        return (
          <SelectedGenreItem
            genre={genre}
            selectedGenres={props.selectedGenres}
            setSelectedGenres={props.setSelectedGenres}
          />
        );
      })}
    </div>
  );
};

export default SelectedGenresList;
