import React from "react";

import "./GenreList.css";
import GenreItem from "../GenreItem/GenreItem";

const GenreList = (props) => {
  if (props.keyword && props.keyword.length > 0) {
    return (
      <div className="genre-list">
        {props.genreList.map((genre) => {
          return (
            <GenreItem
              genre={genre}
              updateSelectedGenres={props.updateSelectedGenres}
              setKeyword={props.setKeyword}
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
