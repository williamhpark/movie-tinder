import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";

import "./ShowCards.css";

const ShowCards = (props) => {
  const [displayedResults, setDisplayedResults] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [error, setError] = useState();

  const { results, roomCode } = props;

  useEffect(() => {
    setDisplayedResults(results);
  }, [results]);

  const swiped = async (direction, id) => {
    try {
      setLastDirection(direction);

      // Get data of result with matching Netflix ID
      let swipedShowData = results.find((show) => show.netflixid === id);
      swipedShowData.roomid = roomCode;

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

  let tempResults = displayedResults;
  const outOfFrame = (id) => {
    tempResults = tempResults.filter((show) => show.netflixid !== id);
    setDisplayedResults(tempResults);
  };

  return (
    <div className="cards">
      {!displayedResults || displayedResults.length === 0 ? (
        <h3 className="cards__end-message">End of results</h3>
      ) : (
        results.map((show) => {
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
        <h3 className="cards__swipe-direction">You swiped {lastDirection}</h3>
      ) : (
        <h3 className="cards__swipe-direction">Swipe a card to get started!</h3>
      )}
    </div>
  );
};

export default ShowCards;
