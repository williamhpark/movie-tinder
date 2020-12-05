import React from "react";

const GenreSelect = (props) => {
  return (
    <ol>
      {props.genres.map((genre) => {
        return <li key={genre}>{genre}</li>;
      })}
    </ol>
  );
};

export default GenreSelect;
