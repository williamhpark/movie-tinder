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
    <div className="genre-item">
      <button
        key={props.genre.id}
        type="button"
        onClick={() => handleClick(props.genre)}
      >
        {props.genre.name}
      </button>
    </div>
  );
};

export default GenreItem;
