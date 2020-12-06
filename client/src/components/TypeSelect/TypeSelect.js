import React from "react";
import "./typestyle.css";

function TypeSelect(props) {
  return (
    <div class="center">
      <h1>Movies</h1>
      <input
        onClick={() => props.setIsMovie(!props.isMovie)}
        type="checkbox"
        name=""
      />
      <h1>Shows</h1>
      <input
        onClick={() => props.setIsShow(!props.isShow)}
        type="checkbox"
        name=""
      />
    </div>
  );
}

export default TypeSelect;
