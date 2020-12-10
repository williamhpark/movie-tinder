import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import "./SelectedGenreItem.css";

const SelectedGenreItem = (props) => {
  const removeGenre = (genre) => {
    const filtered = props.selectedGenres.filter((item) => {
      return item !== genre;
    });
    props.setSelectedGenres(filtered);
  };

  return (
    <div className="selected-genre">
      <div className="remove-icon" onClick={() => removeGenre(props.genre)}>
        <FontAwesomeIcon icon={faMinus} />
      </div>
      {props.genre}
    </div>
  );
};

export default SelectedGenreItem;
