import React from "react";
import "./FishingSpotModule.css";
import { FishType } from "./FishType";
import { Location } from "./FishingLocation";
import { PopUp } from "../PopUpModule/PopUpModule";

export const FishingSpotModule = (props) => {
  const fishingSpot = props.chosenSpot;
  return (
    <PopUp>
      <div className={"FishingSpot-CoverImage"}>
        <Location location={fishingSpot.name}></Location>
        <div className={"FishingSpot-StoryButton"}>🐟</div>
        <img
          className={"FishingSpot-Image"}
          src="https://i.imgur.com/jTzHTWU.png"
          alt="billede"
        ></img>
      </div>
      <div className={"FishingSpot-FishContainer"}>
        <FishType fishTypes={fishingSpot.fishTypes}></FishType>
      </div>

      <div className={"FishingSpot-TextField"}>{fishingSpot.description}</div>
    </PopUp>
  );
};
