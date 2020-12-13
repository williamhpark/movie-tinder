import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import { ShowContext } from "../../ShowContext";

const ResultsPage = (props) => {
  const [state, setState] = useContext(ShowContext);

  let mediaType = "";
  let results = [];
  let genreids = [];
  let id = null;

  console.log(mediaType);

  for (var i in state.selectedGenres) {
    genreids.push(state.selectedGenres[i].id);
  }

  // MAKE SURE THAT THEY HAVE TO CLICK A BUTTON IN ORDER FOR IT TO WORK

  if (state.isMovie && state.isSeries) {
    mediaType = "Any";
  } else if (state.isMovie) {
    mediaType = "Movie";
  } else if (state.isSeries) {
    mediaType = "Show";
  }

  const fetchinformation = useCallback(() => {
    genreids.forEach((id) => {
      const options = {
        method: "GET",
        url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
        params: {
          q: `get:new7-!1900,2018-!0,5-!0,10-!${id}-!${mediaType}-!Any-!Any-!gt100-!{downloadable}`,
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
          console.log(results + "yes u can");
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
      <h1>{mediaType}</h1>
      <h1>hello</h1>
    </div>
  );
};

export default ResultsPage;
