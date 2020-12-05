import React, { useState, useEffect } from "react";
import axios from "axios";

import TypeSelect from "../components/TypeSelect/TypeSelect";
import GenreSelect from "../components/GenreSelect/GenreSelect";

const OptionSelectPage = (props) => {
  const [isMovie, setIsMovie] = useState(null);
  const [genre, setGenre] = useState("");
  let genres = [];

  useEffect(() => {
    getGenres();
    console.log(isMovie);
  });

  const getGenres = async () => {
    const options = {
      method: "GET",
      url: "https://unogs-unogs-v1.p.rapidapi.com/api.cgi",
      params: { t: "genres" },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
        "x-rapidapi-host": process.env.REACT_APP_UNOGS_HOST,
      },
    };

    axios
      .request(options)
      .then((response) => {
        response.data.ITEMS.forEach((element) =>
          genres.push(Object.keys(element)[0])
        );
        console.log(JSON.stringify(genres));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <TypeSelect setIsMovie={setIsMovie} />
      <GenreSelect genres={genres} />
    </div>
  );
};

export default OptionSelectPage;
