import React, { useContext } from "react";

import "./TypeSelect.css";
import { ShowContext } from "../../context/ShowContext";

const TypeSelect = (props) => {
  const { showData, setShowData } = useContext(ShowContext);

  const isMovieHandler = (e) => {
    setShowData((prevData) => ({
      ...prevData,
      isMovie: e.target.checked,
    }));
  };
  const isSeriesHandler = (e) => {
    setShowData((prevData) => ({
      ...prevData,
      isSeries: e.target.checked,
    }));
  };

  return (
    <div className="type-select">
      <h2>Media Type</h2>
      <div className="type-select__container">
        <div className="type-select__checkbox">
          <label htmlFor="movie">Movie</label>
          <input
            type="checkbox"
            id="movie"
            name="movie"
            checked={showData.isMovie}
            onChange={(e) => isMovieHandler(e)}
          />
        </div>
        <div className="type-select__checkbox">
          <label htmlFor="series">Shows</label>
          <input
            type="checkbox"
            id="series"
            name="series"
            checked={showData.isSeries}
            onChange={(e) => isSeriesHandler(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default TypeSelect;
