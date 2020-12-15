import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";

import "./ResultsPage.css";
import { ShowContext } from "../../context/ShowContext";
import ShowCards from "../../components/results/ShowCards/ShowCards";
import SwipeButtons from "../../components/results/SwipeButtons/SwipeButtons";

const ResultsPage = (props) => {
  const [results, setResults] = useState([]);

  const { showData } = useContext(ShowContext);

  let genreIds = [];
  for (let i in showData.selectedGenres) {
    genreIds.push(showData.selectedGenres[i].id);
  }

  // MAKE SURE THAT THEY HAVE TO CLICK A BUTTON IN ORDER FOR IT TO WORK

  let mediaType = "";
  if (showData.isMovie && showData.isSeries) {
    mediaType = "Any";
  } else if (showData.isMovie) {
    mediaType = "Movie";
  } else if (showData.isSeries) {
    mediaType = "Series";
  }

  const fetchInformation = useCallback(() => {
    // Country ID for Canada
    const countryId = "33";

    genreIds.forEach((id) => {
      let options = {
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
          // Number of total pages for the API call, since API results come in pages of 100 results each
          let numberPages = Math.ceil(response.data.COUNT / 100);
          console.log(response.data.COUNT);
          console.log(numberPages);
          let page = 1;
          while (page <= numberPages) {
            // The page number is incremented until all results are extracted
            let resultsOptions = {
              ...options,
              params: { ...options.params, p: `${page}` },
            };

            axios
              .request(resultsOptions)
              .then((response) => {
                for (let item of response.data.ITEMS) {
                  resultsArr.push(item);
                }
                // Removes any duplicate items in the results state variable
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

            page += 1;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  useEffect(() => {
    fetchInformation();
  }, []);

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
