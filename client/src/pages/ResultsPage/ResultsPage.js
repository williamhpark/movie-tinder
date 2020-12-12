import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import { Usercontext } from "../../Context";

const ResultsPage = (props) => {
  const { contextMovie, contextSeries, contextSelectedGenres } = useContext(
    Usercontext
  );
  const [isMovie, setIsMovie] = contextMovie;
  const [isSeries, setIsSeries] = contextSeries;
  const [selectedGenres, setSelectedGenres] = contextSelectedGenres;

  let mediatype = "";
  let results = [];
  let genreids = [];
  let id = null;

  console.log(mediatype);

  for (var i in selectedGenres) {
    genreids.push(selectedGenres[i].id);
  }

  // MAKE SURE THAT THEY HAVE TO CLICK A BUTTON IN ORDER FOR IT TO WORK

  if (isMovie && isSeries) {
    mediatype = "Any";
  } else if (isMovie) {
    mediatype = "Movie";
  } else if (isSeries) {
    mediatype = "Show";
  }

  const fetchinformation = useCallback(() => {
    genreids.forEach((element) => {
      let id = element;

      const options = {
        method: "GET",
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
        params: {
          q: `get:new7-!1900,2018-!0,5-!0,10-!${id}-!${mediatype}-!Any-!Any-!gt100-!{downloadable}`,
          t: "ns",
          cl: "all",
          st: "adv",
          ob: "Relevance",
          p: "1",
          sa: "and",
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_UNOGS_KEY,
          "x-rapidapi-host": process.env.REACT_APP_UNOGS_HOST,
        },
      };

      axios
        .request(options)
        .then((response) => {
          for (var k in response.data.ITEMS) {
            results.push(response.data.ITEMS[k]);
          }
          results = [
            ...new Map(
              results.map((item) => [item["netflixid"], item])
            ).values(),
          ];
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  useEffect(() => {
    fetchinformation();
  }, [fetchinformation]);

  return (
    <div>
      <h1>{mediatype}</h1>
      <h1>hello</h1>
    </div>
  );
};

export default ResultsPage;
