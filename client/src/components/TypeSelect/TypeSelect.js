import React, { useEffect } from "react";

import "./TypeSelect.css";

const TypeSelect = (props) => {
  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        id="movieCheck"
        onClick={() => props.setIsMovie(!props.isMovie)}
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
