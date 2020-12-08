import React from "react";

import "./GenreList.css";
import GenreItem from "../GenreItem/GenreItem";

const GenreList = (props) => {
  if (props.keyword && props.keyword.length > 0) {
    return (
      <div id="genre-list-container">
        {props.genreList.map((genre) => {
          return (
            <GenreItem
              key={genre}
              genre={genre}
              selectedGenres={props.selectedGenres}
              updateSelectedGenres={props.updateSelectedGenres}
            />
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default GenreList;
