import React from "react";

import "./GenreSearchBar.css";

const GenreSearchBar = (props) => {
  return (
    <input
      className="search-bar"
      type="search"
      value={props.keyword}
      placeholder="Search Genre"
      onChange={(e) => props.updateGenreList(e.target.value)}
    />
  );
};

export default GenreSearchBar;
