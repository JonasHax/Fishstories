import React from "react";
import css from "./FishType.module.css";

export const FishType = (props) => {
  const possibleCatches = props.fishTypes;

  return (
    <div>
      {possibleCatches.map((fish, index) => {
        return (
          <div className={css.FishType} key={index}>
            🐟 {fish}{" "}
          </div>
        );
      })}
    </div>
  );
};
