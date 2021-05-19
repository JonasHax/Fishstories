import React from "react";
import css from "./FishingLocation.module.css";

export const Location = (props) => {
  return <div className={`${css.Location} ${css[props.className]}`}>🚩 {props.location}</div>;
};
