import React from "react";

const TypeSelect = (props) => {
  return (
    <div>
      <button onClick={() => props.setIsMovie(true)}>Movie</button>
      <button onClick={() => props.setIsMovie(false)}>Series</button>
    </div>
  );
};

export default TypeSelect;
