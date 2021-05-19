import React from "react";
import css from "./FishingSpotModule.module.css";
import { FishType } from "./FishType";
import { Location } from "./FishingLocation";
import { PopUp } from "../PopUpModule/PopUpModule";
import defaultCoast from "../../images/fishingSpotType_Coast.png";
import defaultLake from "../../images/fishingSpotType_Lake.png";
import defaultPutAndTake from "../../images/fishingSpotType_PutAndTake.png";
import defaultRiver from "../../images/fishingSpotType_River.png";

export const FishingSpotModule = (props) => {
  const fishingSpot = props.chosenSpot;

  return (
    <PopUp onClose={props.onClose}>
      <div className={css.FishingSpot_CoverImage}>
        <Location location={fishingSpot.name} className={"absolute"}></Location>
        <div className={css.FishingSpot_StoryButton}>🐟</div>
        <img
          className={css.FishingSpot_Image}
          src={
            fishingSpot.type === "Kyst"
              ? defaultCoast
              : fishingSpot.type === "Sø"
              ? defaultLake
              : fishingSpot.type === "Å"
              ? defaultRiver
              : defaultPutAndTake
          }
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
