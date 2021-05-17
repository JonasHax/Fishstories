import React from "react";
import css from "./FishingLocation.module.css";

export const Location = (props) => {
  return <div className={[css.Location, props.className].join(" ")}>🚩 {props.location}</div>;
};
