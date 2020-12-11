import React from "react";

import "./TypeSelect.css";

const TypeSelect = (props) => {
  const reversemovie = (item) => {
    props.setIsMovie(!item);
  };
  const reverseshow = (item) => {
    props.setIsSeries(!item);
  };
  // const removeGenre = (genre) => {
  //   const filtered = props.selectedGenres.filter((item) => {
  //     return item !== genre;
  //   });
  //   setSelectedGenres(filtered);
  // };
  return (
    <div className="center">
      <h1>Movies</h1>
      <input
        onClick={() => reversemovie(props.isMovie)}
        type="checkbox"
        name=""
      />
      <h1>Series</h1>
      <input
        onClick={() => reverseshow(props.isSeries)}
        type="checkbox"
        name=""
      />
    </div>
  );
};

export default TypeSelect;
