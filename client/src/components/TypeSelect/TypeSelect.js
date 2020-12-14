import React, { useContext } from "react";

import "./TypeSelect.css";
import { ShowContext } from "../../context/ShowContext";

const TypeSelect = (props) => {
  const [state, setState] = useContext(ShowContext);

  const toggleIsMovie = () => {
    setState((prevState) => ({ ...prevState, isMovie: !prevState.isMovie }));
  };

  const toggleIsSeries = () => {
    setState((prevState) => ({ ...prevState, isSeries: !prevState.isSeries }));
  };

  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        onClick={() => toggleIsMovie()}
        type="checkbox"
        name="movie"
        checked={state.isMovie}
      />
      <h1>Series</h1>
      <input
        onClick={() => toggleIsSeries()}
        type="checkbox"
        name="series"
        checked={state.isSeries}
      />
    </div>
  );
};

export default TypeSelect;
