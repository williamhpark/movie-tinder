import React from "react";

const GenreSelect = (props) => {
  return (
    <div>
      <h1>Genres</h1>
      <ol>
        {props.genres.map((genre) => {
          return <li key={genre}>{genre}</li>;
        })}
      </ol>
    </div>
  );
};

export default GenreSelect;
