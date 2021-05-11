import React from "react";
import css from "./TopBar.module.css";
import Location from "../../images/location.png";
import Close from "../../images/cancel.png";

export const TopBar = (props) => {
  return (
    <div className={css.TopBarContainer}>
      <div className={[css.Location, css.DropShadow].join(" ")}>
        <img src={Location} alt="Lokation" className={css.LocationIcon}></img>
        {props.location}
      </div>
      <img src={Close} alt="Luk" className={css.ExitButton}></img>
    </div>
  );
};
