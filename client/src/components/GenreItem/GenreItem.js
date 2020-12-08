import React, { useState } from "react";

import "./GenreItem.css";

const GenreItem = (props) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (genre) => {
    props.updateSelectedGenres(genre);
    setSelected(!selected);
  };

  return (
    <button
      className="genre-item"
      key={props.genre}
      type="submit"
      onClick={() => handleClick(props.genre)}
    >
      <h3>{props.genre}</h3>
    </button>
  );
};

export default GenreItem;
