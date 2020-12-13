import React, { useEffect } from "react";

import "../../ShowContext";
import "./TypeSelect.css";

const TypeSelect = (props) => {
  const [state, setState] = useContext(ShowContext);

  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        id="movieCheck"
        onClick={() =>
          setState((state) => ({
            ...state,
            isMovie: [...state.isMovie, !state.isMovie],
          }))
        }
        type="checkbox"
        name=""
        checked={props.isMovie}
      />
      <h1>Series</h1>
      <input
        id="seriesCheck"
        onClick={() => props.setIsSeries(!props.isSeries)}
        type="checkbox"
        name=""
        checked={props.isSeries}
      />
    </div>
  );
};

export default TypeSelect;
