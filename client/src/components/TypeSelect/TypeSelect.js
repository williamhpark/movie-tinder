import React, { useEffect } from "react";

import "./TypeSelect.css";

const TypeSelect = (props) => {
  useEffect(() => {
    if (props.isMovie == true) {
      document.getElementById("movieCheck").setAttribute("checked", "true");
    }
    if (props.isSeries == true) {
      document.getElementById("seriesCheck").setAttribute("checked", "true");
    }
  });

  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        id="movieCheck"
        onClick={() => props.setIsMovie(!props.isMovie)}
        type="checkbox"
        name=""
      />
      <h1>Series</h1>
      <input
        id="seriesCheck"
        onClick={() => props.setIsSeries(!props.isSeries)}
        type="checkbox"
        name=""
      />
    </div>
  );
};

export default TypeSelect;
