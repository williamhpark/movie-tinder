import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { IconButton } from "@material-ui/core";

import "./OptionSelect.css";
import TypeSelect from "../TypeSelect/TypeSelect";
import GenreSelect from "../GenreSelect/GenreSelect";

const OptionSelect = (props) => {
  const [genreListDefault, setGenreListDefault] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const fetchGenres = useCallback(() => {
    const options = {
      method: "GET",
      url: "https://unogs-unogs-v1.p.rapidapi.com/api.cgi",
      params: { t: "genres" },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
      },
    };

    let genresArr = [];

    axios
      .request(options)
      .then((response) => {
        for (let item of response.data.ITEMS) {
          // Only include specific genres, not parent genres (parent genres contain the keyword "All")
          if (!Object.keys(item)[0].includes("All")) {
            genresArr.push({
              id: Object.values(item)[0][0],
              name: Object.keys(item)[0],
            });
          }
        }
        setGenreListDefault(genresArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchGenres();
  }, []);

  // useEffect(() => {
  //   let testGenresArr = [
  //     { id: 0, name: "All Genres" },
  //     { id: 1, name: "All Action" },
  //     { id: 2, name: "All Comedy" },
  //     { id: 3, name: "Genre 1" },
  //     { id: 4, name: "Genre 2" },
  //     { id: 5, name: "Genre 3" },
  //     { id: 6, name: "Genre 4" },
  //     { id: 7, name: "Genre 5" },
  //   ];
  //   setGenreListDefault(testGenresArr);
  // }, []);

  return (
    <div className="option-select">
      <h1>Choose your preferences</h1>
      <TypeSelect />
      <GenreSelect
        genreListDefault={genreListDefault}
        setGenreListDefault={setGenreListDefault}
        genreList={genreList}
        setGenreList={setGenreList}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <div className="option-select__start">
        <form className="form">
          <input
            type="submit"
            value="Start"
            onClick={() => history.push("/results")}
          />
        </form>
      </div>
    </div>
  );
};
export default OptionSelect;
