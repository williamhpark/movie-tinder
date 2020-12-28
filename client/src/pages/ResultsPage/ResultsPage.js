import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import queryString from "query-string";

import "./ResultsPage.css";
import { ShowContext } from "../../context/ShowContext";
import ShowCards from "../../components/results/ShowCards/ShowCards";
import SwipeButtons from "../../components/results/SwipeButtons/SwipeButtons";

let socket;

const ResultsPage = ({ location }) => {
  const { showData, setShowData } = useContext(ShowContext);
  // const [data, setData] = useState([]);
  const history = useHistory();
  const ENDPOINT = "localhost:5000";
  const { room, creator } = queryString.parse(location.search);

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
    setShowData((prevData) => ({
      ...prevData,
      results: [],
    }));

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
                  resultsArr.push({
                    netflixid: item.netflixid,
                    title: item.title,
                    image: item.image,
                    synopsis: item.synopsis,
                    type: item.type,
                    released: item.released,
                    runtime: item.runtime,
                  });
                }
                // Removes any duplicate items in the results state variable
                setShowData((prevData) => ({
                  ...prevData,
                  results: [
                    ...new Map(
                      [...prevData.results, ...resultsArr].map((item) => [
                        item["netflixid"],
                        item,
                      ])
                    ).values(),
                  ],
                }));
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
    socket = io(ENDPOINT);
    if (creator === "false") {
      socket.emit("getResults", room);
      socket.on("returnResults", (res) => {
        console.log(`lol xd ${res}`);
        setShowData((prevData) => ({
          ...prevData,
          results: res,
        }));
      });
      console.log(`wrgeok${showData.results}`);
    }
    fetchInformation();
  }, []);

  return (
    <div className="page">
      <ShowCards room={room} creator={creator} />
      <SwipeButtons />
      <button onClick={() => history.push("/final")}>done</button>
    </div>
  );
};

export default ResultsPage;
