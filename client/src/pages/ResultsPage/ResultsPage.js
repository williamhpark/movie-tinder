import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./ResultsPage.css";
import { ShowContext } from "../../context/ShowContext";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import ShowCards from "../../components/ShowCards/ShowCards";

let socket;
const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? window.location.hostname
    : "localhost:5000";

const ResultsPage = ({ location }) => {
  const { showData, setShowData } = useContext(ShowContext);
  const [isLoader, setIsLoader] = useState(undefined);
  const history = useHistory();
  const { creator, roomCode } = queryString.parse(location.search);

  const fetchData = async (genreIds, mediaType) => {
    // Show the page loader
    setIsLoader(true);

    // Removes any results that may be leftover from previous page renders
    setShowData((prevData) => ({
      ...prevData,
      results: [],
    }));

    const apiUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi";
    // Country ID for Canada
    const countryId = "33";

    genreIds.forEach((id, index, array) => {
      let options = {
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
        .get(apiUrl, options)
        .then((response) => {
          let currentPage = 1;
          // Number of total pages for the API call, since API results come in pages of 100 results each
          let totalPages = Math.ceil(response.data.COUNT / 100);
          while (currentPage <= totalPages) {
            // Use the same options used for the totalPages API call except the page number is incremented until all results are extracted
            let resultsOptions = {
              ...options,
              params: { ...options.params, p: `${currentPage}` },
            };
            axios
              .get(apiUrl, resultsOptions)
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
                    rating: item.rating === "" ? 0 : parseFloat(item.rating), // Set to 0 if empty string, else convert rating from string to float
                  });
                }
                setShowData((prevData) => ({
                  ...prevData,
                  results: [
                    // Add the new results while removing any duplicates
                    ...new Map(
                      [...prevData.results, ...resultsArr].map((item) => [
                        item["netflixid"],
                        item,
                      ])
                    ).values(),
                  ].sort((a, b) => {
                    return a.rating - b.rating; // Sort the results in order of IMDB rating
                  }),
                }));
              })
              .catch((error) => {
                console.error(error);
              });
            currentPage += 1;
          }
        })
        .then(() => {
          // If this is the last API call, remove the loader
          if (index === array.length - 1) {
            setIsLoader(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  useEffect(() => {
    if (creator === "true") {
      let genreIds = [];
      for (let i in showData.selectedGenres) {
        genreIds.push(showData.selectedGenres[i].id);
      }
      let mediaType = "";
      if (showData.isMovie && showData.isSeries) {
        mediaType = "Any";
      } else if (showData.isMovie) {
        mediaType = "Movie";
      } else if (showData.isSeries) {
        mediaType = "Series";
      }
      fetchData(genreIds, mediaType);
    }
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (creator === "true") {
      let data = showData.results;
      socket.emit("addResults", { data, roomCode });
    }
  }, [ENDPOINT, showData.results]);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (creator === "false") {
      socket.emit("getResults", roomCode);
      socket.on("returnResults", (res) => {
        setShowData((prevData) => ({
          ...prevData,
          results: res,
        }));
      });
    }
  }, [ENDPOINT]);

  const submit = async (e) => {
    e.preventDefault();
    setShowData({
      isMovie: false,
      isSeries: false,
      selectedGenres: [],
      results: [],
    });
    history.push(`/waiting?roomCode=${roomCode}`);
  };

  return (
    <div className="page results-page">
      {isLoader || !showData.results || showData.results.length === 0 ? (
        <FullPageLoader />
      ) : (
        <>
          <h3 className="results-page__swipe-instructions">
            Swipe right to accept and left to reject
          </h3>
          <ShowCards roomCode={roomCode} creator={creator} />
          <form className="results-page__done-button form" onSubmit={submit}>
            <input type="submit" value="I'm done swiping!" />
          </form>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
