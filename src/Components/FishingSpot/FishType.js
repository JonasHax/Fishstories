import React from "react";
import css from "./FishType.module.css";

export const FishType = (props) => {
  const possibleCatches = props.fishTypes;

  return (
    <div>
      {possibleCatches.map((fish) => {
        return <div className={css.FishType}>🐟 {fish} </div>;
      })}
    </div>
  );
};
