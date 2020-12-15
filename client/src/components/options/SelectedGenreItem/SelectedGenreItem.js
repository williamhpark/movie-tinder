import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import "./SelectedGenreItem.css";
import { ShowContext } from "../../../context/ShowContext";

const SelectedGenreItem = (props) => {
  const [showData, setShowData] = useContext(ShowContext);
  const removeGenre = (genre) => {
    const filtered = showData.selectedGenres.filter((item) => {
      return item.id !== genre.id;
    });
    setShowData((prevData) => ({ ...prevData, selectedGenres: filtered }));
  };

  return (
    <div className="selected-genre">
      <div className="remove-icon" onClick={() => removeGenre(props.genre)}>
        <FontAwesomeIcon icon={faMinus} />
      </div>
      {props.genre.name}
    </div>
  );
};

export default SelectedGenreItem;
