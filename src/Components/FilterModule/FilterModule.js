import React from "react";
import { PopUp } from "../PopUpModule/PopUpModule";
import css from "./FilterModule.module.css";
import havørrede from "../../images/havørred.png";

export const FilterModule = (props) => {
  const filterTypes = props.filterTypes;
  const menuTitel = props.menuTitel;
  const selectedFilters = new Array();

  function handletilføjClick() {}

  function toggleSelected(id) {
    var element = document.getElementById(id);
    element.classList.toggle(css.Pressed);

    if (selectedFilters.includes(id)) {
      const index = selectedFilters.indexOf(id);
      if (index > -1) {
        selectedFilters.splice(index, 1);
      }
    } else {
      selectedFilters.push(id);
    }

    console.log(selectedFilters);
  }

  return (
    <PopUp>
      <div className={css.Headline}>
        {" "}
        <h4> {menuTitel} </h4>{" "}
      </div>
      <div className={css.FilterContainer}>
        {filterTypes.map((filter) => {
          return (
            <div
              className={css.FilterButton}
              id={filter}
              onClick={() => toggleSelected(filter)}
            >
              {" "}
              <text> {filter} </text>
              <img src={havørrede} alt="" />
            </div>
          );
        })}
      </div>
      <button
        className={"AcceptButton AnimatedButton NonSelectable"}
        onClick={handletilføjClick}
      >
        ✔ Benyt filtræring
      </button>
    </PopUp>
  );
};
