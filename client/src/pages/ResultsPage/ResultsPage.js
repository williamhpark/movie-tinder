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

const ResultsPage = ({ location }) => {
  const { showData, setShowData } = useContext(ShowContext);
  const [isLoader, setIsLoader] = useState(true);
  const history = useHistory();
  const { creator, roomCode } = queryString.parse(location.search);
  const ENDPOINT = "localhost:5000";

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

  const fetchData = async () => {
    const apiUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi";
    // Country ID for Canada
    const countryId = "33";

    setShowData((prevData) => ({
      ...prevData,
      results: [],
    }));

    genreIds.forEach((id) => {
      setIsLoader(true);

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
          let page = 1;
          // Number of total pages for the API call, since API results come in pages of 100 results each
          let numberPages = Math.ceil(response.data.COUNT / 100);
          while (page <= numberPages) {
            // The page number is incremented until all results are extracted
            let resultsOptions = {
              ...options,
              params: { ...options.params, p: `${page}` },
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
                  });
                }
                console.log(resultsArr);
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
        .then(() => setIsLoader(false))
        .catch((error) => {
          console.error(error);
        });
    });
  };

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
    fetchData();
  }, []);

  return (
    <div className="page results-page">
      {isLoader && <FullPageLoader />}
      <ShowCards roomCode={roomCode} creator={creator} />
      <form className="results-page__done-button form">
        <input
          type="submit"
          value="I'm done swiping!"
          onClick={() => history.push(`/waiting?roomCode=${roomCode}`)}
        />
      </form>
    </div>
  );
};

export default ResultsPage;
