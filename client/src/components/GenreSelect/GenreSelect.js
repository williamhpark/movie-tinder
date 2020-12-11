import React from "react";

import "./GenreSelect.css";
import GenreSearchBar from "../GenreSearchBar/GenreSearchBar";
import GenreList from "../GenreList/GenreList";
import SelectedGenresList from "../SelectedGenresList/SelectedGenresList";

const GenreSelect = (props) => {
  const updateGenreList = (keyword) => {
    props.setKeyword(keyword);
    const filtered = props.genreListDefault.filter((genre) => {
      return genre.name.toLowerCase().includes(keyword.toLowerCase());
    });
    props.setGenreList(filtered);
  };

  const updateSelectedGenres = (genre) => {
    if (!props.selectedGenres.includes(genre)) {
      props.setSelectedGenres([...props.selectedGenres, genre]);
    }
  };

  return (
    <div id="genre-select">
      <h1>Genres List</h1>
      <div id="container">
        <div id="search-list">
          <GenreSearchBar
            keyword={props.keyword}
            updateGenreList={updateGenreList}
          />
          <GenreList
            keyword={props.keyword}
            genreList={props.genreList}
            selectedGenres={props.selectedGenres}
            updateSelectedGenres={updateSelectedGenres}
            setKeyword={props.setKeyword}
          />
        </div>
        <SelectedGenresList
          selectedGenres={props.selectedGenres}
          setSelectedGenres={props.setSelectedGenres}
        />
      </div>
    </div>
  );
};

export default GenreSelect;
