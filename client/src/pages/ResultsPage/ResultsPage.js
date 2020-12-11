import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import "./ResultsPage.css";
import { ShowContext } from "../../ShowContext";
import Header from "../../components/Header/Header";
import ShowCards from "../../components/ShowCards/ShowCards";
import SwipeButtons from "../../components/SwipeButtons/SwipeButtons";

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

  const shows = [
    {
      netflixid: 1,
      title: "men",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      synopsis:
        "men men men men men men men men men men men men men men men men men men men men men men men men men men men men",
      type: "movie",
      released: 2017,
      runtime: "1h32m",
    },
    {
      netflixid: 2,
      title: "will is hot",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      synopsis:
        "will is hot will is hot will is hot will is hot will is hot will is hot will is hot will is hot",
      type: "series",
      released: 2018,
      runtime: "1h34m",
    },
    {
      netflixid: 3,
      title: "LMFAO",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      synopsis:
        "synopsis nyee ai synopsis nyee ai synopsis nyee ai synopsis nyee ai synopsis nyee ai synopsis nyee ai",
      type: "movie",
      released: 2019,
      runtime: "1h36m",
    },
    {
      netflixid: 4,
      title: "Bitch",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      synopsis:
        "bitch butch butch bitch tbtich bitch butch butch bitch tbtichbitch butch butch bitch tbtichbitch butch butch bitch tbtichbitch butch butch bitch tbtich",
      type: "series",
      released: 2020,
      runtime: "1h00m",
    },
  ];

  return (
    <div>
      <Header />
      <ShowCards shows={shows} />
      <SwipeButtons />
    </div>
  );
};

export default ResultsPage;
