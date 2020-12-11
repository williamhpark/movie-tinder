import React from "react";

import "./TypeSelect.css";

const TypeSelect = (props) => {
  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        onClick={() => props.setIsMovie(props.isMovie)}
        type="checkbox"
        name=""
      />
      <h1>Series</h1>
      <input
        onClick={() => props.setIsSeries(props.isSeries)}
        type="checkbox"
        name=""
      />
    </div>
  );
};

export default TypeSelect;
