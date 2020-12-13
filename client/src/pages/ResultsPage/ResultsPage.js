import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import "./ResultsPage.css";
import { ShowContext } from "../../context/ShowContext";
import Header from "../../components/Header/Header";
import ShowCards from "../../components/ShowCards/ShowCards";
import SwipeButtons from "../../components/SwipeButtons/SwipeButtons";

const ResultsPage = (props) => {
  const [state, setState] = useContext(ShowContext);
  const [results, setResults] = useState([]);

  let genreIds = [];
  for (var i in state.selectedGenres) {
    genreIds.push(state.selectedGenres[i].id);
  }

  // MAKE SURE THAT THEY HAVE TO CLICK A BUTTON IN ORDER FOR IT TO WORK

  let mediaType = "";
  if (state.isMovie && state.isSeries) {
    mediaType = "Any";
  } else if (state.isMovie) {
    mediaType = "Movie";
  } else if (state.isSeries) {
    mediaType = "Series";
  }

  const fetchInformation = useCallback(() => {
    const countryId = "33";

    genreIds.forEach((id) => {
      const options = {
        method: "GET",
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
        params: {
          q: `-!1900,2020-!0,5-!0,10-!${id}-!${mediaType}-!Any-!Any-!-!{downloadable}`,
          t: "ns",
          cl: `${countryId}`,
          st: "adv",
          ob: "Relevance",
          p: "1",
          sa: "and",
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
          "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
        },
      };

      let resultsArr = [];

      axios
        .request(options)
        .then((response) => {
          for (let item of response.data.ITEMS) {
            resultsArr.push(item);
          }
          console.log(resultsArr);
          setResults((prevResults) => [
            ...new Map(
              [...prevResults, ...resultsArr].map((item) => [
                item["netflixid"],
                item,
              ])
            ).values(),
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  useEffect(() => {
    fetchInformation();
  }, [fetchInformation]);

  return (
    <div>
      <h1>{mediaType}</h1>
      <ol>
        {results.map((show) => {
          return <li>{show.title}</li>;
        })}
      </ol>
    </div>
  );
};

export default ResultsPage;
