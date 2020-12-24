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
          // Only include specific genres (parent genres have the keyword "All")
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

  return (
    <div id="option-select">
      <TypeSelect />
      <GenreSelect
        genreListDefault={genreListDefault}
        setGenreListDefault={setGenreListDefault}
        genreList={genreList}
        setGenreList={setGenreList}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <button onClick={() => history.push(`/results?room=${props.room}`)}>
        done
      </button>
    </div>
  );
};
export default OptionSelect;
