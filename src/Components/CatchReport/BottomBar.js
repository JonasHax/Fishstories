import React, { useState } from "react";
import css from "./BottomBar.module.css";
import FishType from "../../images/fish.png";
import Weight from "../../images/weight.png";
import Ruler from "../../images/ruler.png";

export const BottomBar = (props) => {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(!toggled);
  };

  return (
    <div
      className={[
        css.BottomBarContainer,
        toggled ? css.ExpandedDescription : null,
      ].join(" ")}
      onClick={handleClick}
    >
      <div className={css.FishType}>
        <img src={FishType} alt="Art" className={css.FishIcon}></img>{" "}
        {props.fishType}
      </div>
      <div className={css.Weight}>
        <img src={Weight} alt="Vægt" className={css.Icons}></img> {props.weight}{" "}
        kg
      </div>
      <div className={css.Lenght}>
        <img src={Ruler} alt="Længde" className={css.Icons}></img>{" "}
        {props.lenght} cm
      </div>
      <div className={css.Description}>{props.description}</div>
      <div
        className={
          !toggled && props.description.length > 100 ? css.TextFade : null
        }
      />
    </div>
  );
};
