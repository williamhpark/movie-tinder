import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import "./OptionSelectPage.css";
import TypeSelect from "../../components/TypeSelect/TypeSelect";
import GenreSelect from "../../components/GenreSelect/GenreSelect";

const OptionSelectPage = (props) => {
  const [genreListDefault, setGenreListDefault] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [keyword, setKeyword] = useState("");

  // const fetchGenres = useCallback(() => {
  //   const options = {
  //     method: "GET",
  //     url: "https://unogs-unogs-v1.p.rapidapi.com/api.cgi",
  //     params: { t: "genres" },
  //     headers: {
  //       "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
  //       "x-rapidapi-host": process.env.REACT_APP_UNOGS_HOST,
  //     },
  //   };
  //   let genresArr = [];
  //   axios
  //     .request(options)
  //     .then((response) => {
  //       response.data.ITEMS.forEach((element) =>
  //         genresArr.push(Object.keys(element)[0])
  //       );
  //       console.log(JSON.stringify(genresArr));
  //       setGenreListDefault(genresArr);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetchGenres();
  // }, [fetchGenres]);

  useEffect(() => {
    let testGenresArr = ["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5"];
    setGenreListDefault(testGenresArr);
  }, []);

  return (
    <div id="option-select-page">
      <TypeSelect
        isMovie={props.isMovie}
        setIsMovie={props.setIsMovie}
        isSeries={props.isSeries}
        setIsSeries={props.setIsSeries}
      />
      <GenreSelect
        genreListDefault={genreListDefault}
        setGenreListDefault={setGenreListDefault}
        genreList={genreList}
        setGenreList={setGenreList}
        keyword={keyword}
        setKeyword={setKeyword}
        selectedGenres={props.selectedGenres}
        setSelectedGenres={props.setSelectedGenres}
      />
    </div>
  );
};

export default OptionSelectPage;
