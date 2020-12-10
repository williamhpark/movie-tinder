import React, { useState } from "react";

import "./GenreItem.css";

const GenreItem = (props) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (genre) => {
    props.updateSelectedGenres(genre);
    props.setKeyword("");
    setSelected(!selected);
  };

  return (
    <button
      className="genre-item"
      key={props.genre.id}
      type="submit"
      onClick={() => handleClick(props.genre)}
    >
      <h3>{props.genre.name}</h3>
    </button>
  );
};

export default GenreItem;
