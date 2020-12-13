import React, { useContext } from "react";

import "./GenreSelect.css";
import { ShowContext } from "../../context/ShowContext";
import GenreSearchBar from "../GenreSearchBar/GenreSearchBar";
import GenreList from "../GenreList/GenreList";
import SelectedGenresList from "../SelectedGenresList/SelectedGenresList";

const GenreSelect = (props) => {
  const [state, setState] = useContext(ShowContext);

  const updateGenreList = (keyword) => {
    props.setKeyword(keyword);
    const filtered = props.genreListDefault.filter((genre) => {
      return genre.name.toLowerCase().includes(keyword.toLowerCase());
    });
    props.setGenreList(filtered);
  };

  const updateSelectedGenres = (genre) => {
    if (!state.selectedGenres.includes(genre)) {
      setState((state) => ({
        ...state,
        selectedGenres: [...state.selectedGenres, genre],
      }));
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
            setKeyword={props.setKeyword}
            genreList={props.genreList}
            updateSelectedGenres={updateSelectedGenres}
          />
        </div>
        <SelectedGenresList />
      </div>
    </div>
  );
};

export default GenreSelect;
