import React, { useState } from "react";
import TinderCard from "react-tinder-card";

import "./ShowCards.css";

const ShowCards = (props) => {
  const swiped = (direction, nameToDelete) => {
    console.log("Removing: " + nameToDelete);
    // setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="showCards">
      <div className="showCards__cardContainer">
        {props.shows.map((show) => {
          return (
            <TinderCard
              className="swipe"
              key={show.title}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, show.title)}
              onCardLeftScreen={() => outOfFrame(show.title)}
            >
              <div
                style={{ backgroundImage: `url(${show.image})` }}
                className="card"
              >
                <h3>{show.title}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCards;
