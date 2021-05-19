import React from "react";
import css from "./TopBar.module.css";
import { Location } from "../FishingSpot/FishingLocation"

export const TopBar = (props) => {
  return (
    <div className={css.TopBarContainer}>
      <Location location={props.location} ></Location>
    </div>
  );
};
