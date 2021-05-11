import React from "react";
import css from "./FilterButton.module.css";
import havørrede from "../../images/havørred.png";

export const Button = ({ image }) => {
  // const { logoUrl } = require(image);

  function handleClick() {
    alert(image);
  }

  // const imagepath = require(image)

  return (
    <button
      className={[css.filter_button, css.AnimatedButton].join(" ")}
      onClick={handleClick}
    >
      <img className={css.filter_img} src={image} alt="" />
    </button>
  );
};
