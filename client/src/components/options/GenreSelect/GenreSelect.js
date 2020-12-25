import React, { useContext } from "react";

import "./GenreSelect.css";
import { ShowContext } from "../../../context/ShowContext";
import GenreList from "../GenreList/GenreList";
import SelectedGenresList from "../SelectedGenresList/SelectedGenresList";

const GenreSelect = (props) => {
  const { showData, setShowData } = useContext(ShowContext);

  const updateGenreList = (keyword) => {
    props.setKeyword(keyword);
    const filtered = props.genreListDefault
      .filter((genre) => {
        return genre.name.toLowerCase().includes(keyword.toLowerCase());
      })
      .slice(0, 5);
    props.setGenreList(filtered);
  };

  const updateSelectedGenres = (genre) => {
    if (
      !showData.selectedGenres.some(
        (selectedGenre) => selectedGenre.id === genre.id
      )
    ) {
      setShowData((prevData) => ({
        ...prevData,
        selectedGenres: [...prevData.selectedGenres, genre],
      }));
    }
  };

  return (
    <div className="genre-select">
      <h2>Genres</h2>
      <div className="genre-select__search-selected">
        <div className="genre-select__search">
          <input
            className="genre-select__search-input"
            type="search"
            value={props.keyword}
            placeholder="Search Genre"
            onChange={(e) => updateGenreList(e.target.value)}
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
