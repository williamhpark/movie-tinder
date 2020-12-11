import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import { ShowContext } from "../../ShowContext";

const ResultsPage = (props) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [movieAndShow, setMovieAndShow] = useState("");
  const [movieGenres, setMovieGenres] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [movieSynopsis, setMovieSynopsis] = useState("");
  const [movieReleaseDate, setMovieReleaseDate] = useState("");
  const [movieRunTime, setMovieRunTime] = useState("");
  const [movieID, setMovieID] = useState("");
  // const { contextMovie, contextSeries, contextSelectedGenres } = useContext(
  //   Usercontext
  // );
  // const [isMovie, setIsMovie] = contextMovie;
  // const [isSeries, setIsSeries] = contextSeries;
  // const [selectedGenres, setSelectedGenres] = contextSelectedGenres;

  console.log(movieAndShow);

  //   const information = useCallback(() => {
  //     const options = {
  //       method: "GET",
  //       url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi`,
  //       params: {
  //         q:
  //           "get:new7-!1900,2020-!0,5-!0,10-!${}-!${movieAndShow}-!Any-!Any-!gt100-!{downloadable}",
  //         t: "ns",
  //         cl: "all",
  //         st: "adv",
  //         ob: "Relevance",
  //         p: "1",
  //         sa: "and",
  //       },
  //       headers: {
  //         "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
  //         "x-rapidapi-host": process.env.REACT_APP_UNOGS_HOST,
  //       },
  //     };
  //   }, []);

  //   useEffect(() => {
  //     information();
  //   }, [information]);

  return (
    <div>
      <h1>{movieAndShow}</h1>
      <h1>hello</h1>
    </div>
  );
};

export default ResultsPage;
