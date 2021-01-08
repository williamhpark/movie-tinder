import React, { useState, useEffect } from "react";
import axios from "axios";

import "./FinalResultsPage.css";

const FinalResultsPage = (props) => {
  const [acceptedShows, setAcceptedShows] = useState([]);
  const [numberAcceptedShows, setNumberAcceptedShows] = useState(undefined);
  const [recommendedIndex, setRecommendedIndex] = useState(0);

  const fetchAccepted = async () => {
    let roomid = localStorage.getItem("room-id");
    const res = await axios.get(`/api/shows/accepted/${roomid}`);
    // All of the accepted results for the room, including duplicates
    const rawAcceptedShows = res.data;

    // All accepted results with duplicates removed
    const acceptedShowData = rawAcceptedShows.filter(
      (v, i, a) => a.findIndex((t) => t.netflixid === v.netflixid) === i
    );

    // Object with Netflix IDs as keys and number of occurences as values (e.g. 948002: 3)
    let acceptedShowCount = {};
    rawAcceptedShows.forEach((show) => {
      acceptedShowCount[show.netflixid] = acceptedShowCount[show.netflixid]
        ? acceptedShowCount[show.netflixid] + 1
        : 1;
    });

    // Array with Netflix IDs sorted according to number of occurences (most to least popular)
    let acceptedShowCountArr = [];
    for (let key in acceptedShowCount) {
      let rating = acceptedShowData.find((o) => o.netflixid === key).rating;
      acceptedShowCountArr.push({
        id: key,
        rating: parseFloat(rating),
        count: acceptedShowCount[key],
      });
    }
    // Order the results by number of votes (high to low). If votes are tied, higher IMDB rating takes precedence
    acceptedShowCountArr.sort((a, b) => {
      if (a.count === b.count) {
        return b.rating - a.rating;
      } else {
        return b.count - a.count;
      }
    });
    acceptedShowCountArr = acceptedShowCountArr.map((a) => {
      return a.id;
    });

    // All of the data of the most popular results (most to least popular)
    let finalAcceptedShows = [];
    acceptedShowCountArr.forEach((id) => {
      let obj = acceptedShowData.find((o) => o.netflixid === id);
      finalAcceptedShows.push(obj);
    });

    setNumberAcceptedShows(finalAcceptedShows.length);

    setAcceptedShows(finalAcceptedShows);
  };

  const renderRecommended = () => {
    const recommendedShow = acceptedShows[recommendedIndex];

    return (
      <div className="final-results-page__recommended">
        <div
          style={{ backgroundImage: `url(${recommendedShow?.image})` }}
          className="final-results-page__card"
        >
          <div className="final-results-page__card-content">
            <div
              className="final-results-page__card-title"
              dangerouslySetInnerHTML={{
                __html: `<h3>${recommendedShow?.title}</h3>`,
              }}
            />
            <div
              className="final-results-page__card-synopsis"
              dangerouslySetInnerHTML={{
                __html: `<p>${recommendedShow?.synopsis}</p>`,
              }}
            />
            <div className="final-results-page__card-tags">
              {recommendedShow?.type ? <p>{recommendedShow?.type}</p> : null}
              {recommendedShow?.released ? (
                <p>{recommendedShow?.released}</p>
              ) : null}
              {recommendedShow?.runtime ? (
                <p>{recommendedShow?.runtime}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchAccepted();
  }, []);

  const nextRecommendation = (e) => {
    e.preventDefault();
    setRecommendedIndex(recommendedIndex + 1);
  };

  const resetRecommendations = (e) => {
    e.preventDefault();
    setRecommendedIndex(0);
  };

  return (
    <div className="page final-results-page">
      {recommendedIndex < numberAcceptedShows ? (
        <div>
          <h2 className="final-results-page__header">
            Based on your group's selections, your recommended movie/show is:
          </h2>
          {renderRecommended()}
          <form className="final-results-page__next-button form">
            <input
              type="submit"
              value="Next recommendation"
              onClick={(e) => nextRecommendation(e)}
            />
          </form>
        </div>
      ) : (
        <div className="final-results-page__end-view">
          <h3 className="final-results-page__end-message">
            End of recommendations
          </h3>
          <form className="final-results-page__reset-button form">
            <input
              type="submit"
              value="Click to see again"
              onClick={(e) => resetRecommendations(e)}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default FinalResultsPage;
