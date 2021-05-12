import React from "react";
import css from "./FishingSpotModule.module.css";
import { FishType } from "./FishType";
import { Location } from "./FishingLocation";
import { PopUp } from "../PopUpModule/PopUpModule";

export const FishingSpotModule = (props) => {
  const fishingSpot = props.chosenSpot;
  return (
    <PopUp onClose={props.onClose}>
      <div className={css.FishingSpot_CoverImage}>
        <Location location={fishingSpot.name}></Location>
        <div className={css.FishingSpot_StoryButton}>🐟</div>
        <img
          className={css.FishingSpot_Image}
          src="https://i.imgur.com/jTzHTWU.png"
          alt="billede"
        ></img>
      </div>
      <div className={css.FishingSpot_FishContainer}>
        <FishType fishTypes={fishingSpot.fishTypes}></FishType>
      </div>

      <div className={css.FishingSpot_TextField}>{fishingSpot.description}</div>
    </PopUp>
  );
};
