import React from "react";
import css from "./FilterButton.module.css";
import "../../index.css";

export const FilterButton = ({ image }) => {
  return (
    <button className={[css.filter_button, "AnimatedButton"].join(" ")}>
      <img className={css.filter_img} src={image} alt="" />
    </button>
  );
};
