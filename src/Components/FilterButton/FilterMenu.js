import React from "react";
import css from "./FilterButton.module.css";
import { Button } from "./FilterButton";

export const FilterMenu = () => {
  return (
    <div className={css.FilterContainer}>
      <Button image={"https://i.imgur.com/JsLSgeQ.png"}></Button>
      <Button image={"https://i.imgur.com/FL725Ou.png"}></Button>
    </div>
  );
};
