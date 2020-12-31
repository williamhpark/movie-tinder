import React, { useState, useContext, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";

import "./ShowCards.css";
import { ShowContext } from "../../context/ShowContext";
import { UserContext } from "../../context/UserContext";
import io from "socket.io-client";

const ShowCards = (props) => {
  const { showData, setShowData } = useContext(ShowContext);
  const { userData } = useContext(UserContext);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [error, setError] = useState();
  const ENDPOINT = "localhost:5000";
  const { roomCode, creator } = props;

  let socket;

  const displayedResultsInit = async () => {
    setDisplayedResults(showData.results);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    displayedResultsInit();
    if (creator === "true") {
      let data = showData.results;
      socket.emit("addResults", { data, roomCode, creator });
    }
  }, [showData]);

  const swiped = async (direction, id) => {
    try {
      setLastDirection(direction);

      // Get data of result with matching Netflix ID
      let swipedShowData = showData.results.find(
        (show) => show.netflixid === id
      );
      swipedShowData.roomid = roomCode;
      swipedShowData.userid = userData.user.id;

      if (direction === "right") {
        await axios.post("/api/shows/accepted", swipedShowData);
      } else if (direction === "left") {
        await axios.post("/api/shows/rejected", swipedShowData);
      }
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  let resultsArr = displayedResults;
  const outOfFrame = (id) => {
    resultsArr = resultsArr.filter((show) => show.netflixid !== id);
    setDisplayedResults(resultsArr);
  };

  return (
    <div className="cards">
      {displayedResults.length === 0 ? (
        <p className="cards__end-message">End of results</p>
      ) : (
        displayedResults.map((show) => {
          return (
            <TinderCard
              className="cards--swipe"
              key={show.netflixid}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, show.netflixid)}
              onCardLeftScreen={() => outOfFrame(show.netflixid)}
            >
              <div
                style={{ backgroundImage: `url(${show.image})` }}
                className="cards__card"
              >
                <div className="cards__card-content">
                  {/* Use dangerouslySetInnerHTML since otherwise JSX escapes the HTML and displays the tag */}
                  {/* Note: May want to change in the future, creates possibility for XSS attack */}
                  <div
                    className="cards__card-title"
                    dangerouslySetInnerHTML={{
                      __html: `<h3>${show.title}</h3>`,
                    }}
                  />
                  <div
                    className="cards__card-synopsis"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${show.synopsis}</p>`,
                    }}
                  />
                  <div className="cards__card-tags">
                    {show.type ? <p>{show.type}</p> : null}
                    {show.released ? <p>{show.released}</p> : null}
                    {show.runtime ? <p>{show.runtime}</p> : null}
                  </div>
                </div>
              </div>
            </TinderCard>
          );
        })
      )}
      {lastDirection ? (
        <h3 key={lastDirection} className="cards__swipe-direction">
          You swiped {lastDirection}
        </h3>
      ) : (
        <h3 className="cards__swipe-direction">Swipe a card to get started!</h3>
      )}
      {/* {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )} */}
    </div>
  );
};

export default ShowCards;
