import React, { useState, useContext, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import io from "socket.io-client";

import "./ShowCards.css";
import { ShowContext } from "../../../context/ShowContext";
import { UserContext } from "../../../context/UserContext";
import ErrorNotice from "../../auth/ErrorNotice/ErrorNotice";

let socket;

const ShowCards = (props) => {
  const { showData, setShowData } = useContext(ShowContext);
  const { userData } = useContext(UserContext);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [error, setError] = useState();
  const ENDPOINT = "localhost:5000";
  let socket;
  const room = props.room;
  const creator = props.creator;

  const initializeDisplayedShowData = async () => {
    setDisplayedResults(showData.results);
    console.log(creator);
    if (creator === "true") {
      let data = showData.results;
      socket.emit("addResults", { data, room, creator });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    initializeDisplayedShowData();
  }, [showData]);

  let swipedShowIds = [];
  let resultsArr = displayedResults;

  const swiped = async (direction, id) => {
    console.log("You swiped: " + direction);
    setLastDirection(direction);
    try {
      swipedShowIds.push(id);
      let swipedShowData = showData.results.find(
        (show) => show.netflixid === id
      );
      swipedShowData.userid = userData.user.id;
      console.log(swipedShowData);
      if (direction === "right") {
        await axios.post(
          "http://localhost:5000/api/shows/accepted",
          swipedShowData
        );
      } else if (direction === "left") {
        await axios.post(
          "http://localhost:5000/api/shows/rejected",
          swipedShowData
        );
      }
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  const outOfFrame = (id) => {
    resultsArr = resultsArr.filter((show) => show.netflixid !== id);
    console.log(resultsArr);
    setDisplayedResults(resultsArr);
  };

  return (
    <div className="show-card">
      <div className="container">
        {displayedResults.map((show) => {
          return (
            <TinderCard
              className="swipe"
              key={show.netflixid}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, show.netflixid)}
              onCardLeftScreen={() => outOfFrame(show.netflixid)}
            >
              <div
                style={{ backgroundImage: `url(${show.image})` }}
                className="card"
              >
                <div className="show-info">
                  {/* Use dangerouslySetInnerHTML since otherwise JSX escapes the HTML and displays the tag */}
                  {/* Note: May want to change in the future, creates possibility for XSS attack */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<h2>${show.title}</h2><h3>${show.synopsis}</h3>`,
                    }}
                  ></div>
                  <div className="extra-info">
                    <h3>{show.type}</h3>
                    <h3>{show.released}</h3>
                    <h3>{show.runtime}</h3>
                  </div>
                </div>
              </div>
            </TinderCard>
          );
        })}
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="info-text">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="info-text">Swipe a card to get started!</h2>
      )}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
    </div>
  );
};

export default ShowCards;
