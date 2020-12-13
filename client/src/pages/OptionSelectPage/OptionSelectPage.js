import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

import "./OptionSelectPage.css";
import TypeSelect from "../../components/TypeSelect/TypeSelect";
import GenreSelect from "../../components/GenreSelect/GenreSelect";

const OptionSelectPage = (props) => {
  const [genreListDefault, setGenreListDefault] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchGenres = useCallback(() => {
    const options = {
      method: "GET",
      url: "https://unogs-unogs-v1.p.rapidapi.com/api.cgi",
      params: { t: "genres" },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
        "x-rapidapi-host": process.env.REACT_APP_UNOGS_HOST,
      },
    };

    let genresArr = [];

    axios
      .request(options)
      .then((response) => {
        for (let element of response.data.ITEMS) {
          // Only include specific genres (parent genres have the keyword "All")
          if (!Object.keys(element)[0].includes("All")) {
            genresArr.push({
              id: Object.values(element)[0][0],
              name: Object.keys(element)[0],
            });
          }
        }
        console.log(JSON.stringify(genresArr));
        setGenreListDefault(genresArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

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
    <div id="option-select-page">
      <TypeSelect />
      <GenreSelect
        genreListDefault={genreListDefault}
        setGenreListDefault={setGenreListDefault}
        genreList={genreList}
        setGenreList={setGenreList}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <IconButton>
        <Link to="/results">NEXT</Link>
      </IconButton>
    </div>
  );
};
export default OptionSelectPage;
